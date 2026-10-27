#!/usr/bin/env bash
# deploy.sh — build and deploy lucaszivan.app on this server, from exactly origin/$DEPLOY_BRANCH.
# Daily use (on the server):  git pull && ./deploy.sh        Help: ./deploy.sh --help
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$ROOT/.env"
STATE_DIR="$ROOT/.deploy"
START_SECONDS=$SECONDS

ACTION=deploy
DRY_RUN=false
FORCE=false

# ── Output ───────────────────────────────────────────────────────────────────────────────────────
if [[ -t 1 && -z ${NO_COLOR:-} ]]; then
  BOLD=$'\e[1m' DIM=$'\e[2m' RED=$'\e[31m' GREEN=$'\e[32m' YELLOW=$'\e[33m' BLUE=$'\e[34m' RESET=$'\e[0m'
else
  BOLD='' DIM='' RED='' GREEN='' YELLOW='' BLUE='' RESET=''
fi
step() { printf '\n%s==> %s%s\n' "$BOLD$BLUE" "$*" "$RESET"; }
info() { printf '    %s\n' "$*"; }
ok() { printf '    %s✓ %s%s\n' "$GREEN" "$*" "$RESET"; }
warn() { printf '    %s! %s%s\n' "$YELLOW" "$*" "$RESET" >&2; }
die() {
  printf '\n%s✗ %s%s\n' "$RED$BOLD" "$*" "$RESET" >&2
  exit 1
}
dry() { printf '    %s[dry-run] would: %s%s\n' "$DIM" "$*" "$RESET"; }

on_error() {
  printf '\n%s✗ deploy.sh failed at line %s: %s%s\n' "$RED$BOLD" "$1" "$2" "$RESET" >&2
}
trap 'on_error "$LINENO" "$BASH_COMMAND"' ERR

usage() {
  cat <<EOF
${BOLD}deploy.sh${RESET} — deploy lucaszivan.app on this server from origin/\$DEPLOY_BRANCH.

Usage: ./deploy.sh [--dry-run] [--force]     fetch, build, health-check, switch, smoke-test
       ./deploy.sh --rollback [--dry-run]    switch back to the previously deployed image
       ./deploy.sh --status                  what is deployed and running
       ./deploy.sh --logs                    follow this project's container logs
       ./deploy.sh --help

Options:
  --dry-run   Run the checks and print the plan; change nothing (only \`git fetch\` runs).
  --force     Rebuild and redeploy even if nothing changed. If the working copy is dirty or has
              local commits, discard them with \`git reset --hard origin/<branch>\` + \`git clean -fd\`.

Configuration: .env next to this script (see .env.example). State: .deploy/ (gitignored).
EOF
}

# ── Configuration ────────────────────────────────────────────────────────────────────────────────
# Reads KEY=VALUE lines without executing the file. Variables already set in the environment win,
# matching docker compose's precedence.
load_env() {
  [[ -f $ENV_FILE ]] || die "Missing $ENV_FILE. Copy .env.example to .env and fill it in."
  local line key value
  while IFS= read -r line || [[ -n $line ]]; do
    [[ $line =~ ^[[:space:]]*(#|$) ]] && continue
    [[ $line =~ ^[[:space:]]*([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]] || die "Cannot parse .env line: $line"
    key=${BASH_REMATCH[1]}
    value=${BASH_REMATCH[2]}
    value=${value%"${value##*[![:space:]]}"}
    if [[ $value =~ ^\"(.*)\"$ || $value =~ ^\'(.*)\'$ ]]; then value=${BASH_REMATCH[1]}; fi
    [[ -v $key ]] || export "$key=$value"
  done <"$ENV_FILE"

  : "${DOMAIN:?DOMAIN is required in .env}"
  PROXY_MODE=${PROXY_MODE:-standalone}
  BRANCH=${DEPLOY_BRANCH:-main}
  PROJECT=${COMPOSE_PROJECT_NAME:-lucaszivan-portfolio}
  IMAGE=${IMAGE_NAME:-$PROJECT}
  export IMAGE_NAME=$IMAGE # docker-compose.prod.yml reads it for the app's image
  HEALTH_TIMEOUT=${HEALTH_TIMEOUT:-60}
  KEEP_IMAGES=${KEEP_IMAGES:-3}
  MIN_FREE_DISK_MB=${MIN_FREE_DISK_MB:-2048}
  ANALYTICS_SELF_HOSTED=${ANALYTICS_SELF_HOSTED:-false}
  LABEL="app.lucaszivan.project=$PROJECT"
  CANDIDATE="$PROJECT-candidate"
  export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://$DOMAIN}"
}

compose() {
  local args=(-p "$PROJECT" --project-directory "$ROOT" --env-file "$ENV_FILE" -f "$ROOT/docker-compose.prod.yml")
  [[ $PROXY_MODE == shared-proxy ]] && args+=(-f "$ROOT/docker-compose.shared-proxy.yml")
  [[ $PROXY_MODE == standalone ]] && args+=(--profile standalone)
  [[ $ANALYTICS_SELF_HOSTED == true ]] && args+=(--profile analytics)
  docker compose "${args[@]}" "$@"
}

short() { printf '%s' "${1:0:12}"; }
deployed_sha() { cat "$STATE_DIR/current" 2>/dev/null || true; }
image_exists() { docker image inspect "$1" >/dev/null 2>&1; }

# ── Pre-flight ───────────────────────────────────────────────────────────────────────────────────
require_not_root() {
  [[ $(id -u) -ne 0 ]] || die "Refusing to run as root. Run as the deploy user (see README → Server setup)."
}

port_in_use() {
  command -v ss >/dev/null || return 1
  [[ -n $(ss -Htln "sport = :$1" 2>/dev/null || true) ]]
}

our_caddy_running() {
  [[ -n $(compose ps -q --status running caddy 2>/dev/null || true) ]]
}

preflight() {
  step "Pre-flight checks"
  local cmd
  for cmd in git docker curl flock df awk openssl; do
    command -v "$cmd" >/dev/null || die "Missing required command: $cmd"
  done
  docker info >/dev/null 2>&1 || die "Cannot reach the Docker daemon. Is $(id -un) in the docker group?"
  docker compose version >/dev/null 2>&1 || die "The docker compose plugin is missing."
  local server_version
  server_version=$(docker version -f '{{.Server.Version}}')
  ((${server_version%%.*} >= 25)) || die "Docker >= 25 required (found $server_version)."
  ok "Docker $server_version, $(docker compose version --short)"

  case $PROXY_MODE in
    standalone)
      [[ -n ${ACME_EMAIL:-} ]] || die "ACME_EMAIL is required in standalone mode."
      if ! our_caddy_running; then
        local port
        for port in "${HTTP_PORT:-80}" "${HTTPS_PORT:-443}"; do
          if port_in_use "$port"; then
            die "Port $port is already used by another process or stack. Use PROXY_MODE=shared-proxy (README → Shared-proxy mode)."
          fi
        done
      fi
      ;;
    shared-proxy)
      [[ -n ${SHARED_PROXY_NETWORK:-} ]] || die "SHARED_PROXY_NETWORK is required in shared-proxy mode."
      docker network inspect "$SHARED_PROXY_NETWORK" >/dev/null 2>&1 ||
        die "Docker network '$SHARED_PROXY_NETWORK' not found. List them with: docker network ls"
      [[ $ANALYTICS_SELF_HOSTED != true ]] ||
        die "ANALYTICS_SELF_HOSTED is only supported in standalone mode; use a hosted analytics provider instead."
      ;;
    *) die "PROXY_MODE must be 'standalone' or 'shared-proxy' (got '$PROXY_MODE')." ;;
  esac
  if [[ $ANALYTICS_SELF_HOSTED == true ]]; then
    local var
    for var in ANALYTICS_DOMAIN UMAMI_DB_PASSWORD UMAMI_APP_SECRET; do
      [[ -n ${!var:-} ]] || die "$var is required when ANALYTICS_SELF_HOSTED=true."
    done
  fi
  ok "Mode $PROXY_MODE, domain $DOMAIN, branch $BRANCH"

  local docker_root free_mb
  docker_root=$(docker info -f '{{.DockerRootDir}}' 2>/dev/null || echo "$ROOT")
  free_mb=$(df -Pm "$docker_root" 2>/dev/null | awk 'NR==2 {print $4}') || true
  [[ -n $free_mb ]] || free_mb=$(df -Pm "$ROOT" | awk 'NR==2 {print $4}')
  ((free_mb >= MIN_FREE_DISK_MB)) ||
    die "Only ${free_mb} MB free for Docker (minimum ${MIN_FREE_DISK_MB}). Free space: ./deploy.sh only prunes its own images."
  ok "${free_mb} MB free disk"
}

take_lock() {
  mkdir -p "$STATE_DIR"
  exec 9>"$STATE_DIR/deploy.lock"
  flock -n 9 || die "Another deploy.sh is running (lock: .deploy/deploy.lock)."
}

# ── Git: make the working copy exactly origin/$BRANCH ────────────────────────────────────────────
sync_repo() {
  step "Fetching origin/$BRANCH"
  git -C "$ROOT" fetch --quiet --prune origin "+refs/heads/$BRANCH:refs/remotes/origin/$BRANCH" ||
    die "git fetch failed. Check the deploy key: git remote -v, then ssh -T git@<host in that URL> (README → Deploy key)."

  local checked_out
  checked_out=$(git -C "$ROOT" symbolic-ref --short -q HEAD || echo "(detached)")
  [[ $checked_out == "$BRANCH" ]] ||
    die "The working copy is on '$checked_out', expected '$BRANCH'. Run: git checkout $BRANCH"

  local dirty ahead
  dirty=$(git -C "$ROOT" status --porcelain)
  ahead=$(git -C "$ROOT" rev-list --count "origin/$BRANCH..HEAD")
  if [[ -n $dirty || $ahead -gt 0 ]]; then
    [[ -z $dirty ]] || { warn "Uncommitted changes in the working copy:"; git -C "$ROOT" status --short >&2; }
    [[ $ahead -eq 0 ]] || { warn "Local commits not on origin/$BRANCH:"; git -C "$ROOT" log --oneline "origin/$BRANCH..HEAD" >&2; }
    [[ $FORCE == true ]] ||
      die "Refusing to deploy a working copy that differs from origin/$BRANCH. Push or discard the changes, or rerun with --force to discard them."
    if [[ $DRY_RUN == true ]]; then
      dry "git reset --hard origin/$BRANCH && git clean -fd"
    else
      warn "--force: discarding local changes"
      git -C "$ROOT" reset --quiet --hard "origin/$BRANCH"
      git -C "$ROOT" clean -fd
    fi
  fi

  TARGET_SHA=$(git -C "$ROOT" rev-parse "origin/$BRANCH")
  if [[ ${REQUIRE_SIGNED_COMMITS:-false} == true ]]; then
    git -C "$ROOT" verify-commit "$TARGET_SHA" 2>/dev/null ||
      die "Commit $(short "$TARGET_SHA") has no valid signature (REQUIRE_SIGNED_COMMITS=true)."
    ok "Signature verified for $(short "$TARGET_SHA")"
  fi

  local head
  head=$(git -C "$ROOT" rev-parse HEAD)
  if [[ $head != "$TARGET_SHA" ]]; then
    info "Working copy $(short "$head") → $(short "$TARGET_SHA")"
    if [[ $DRY_RUN == true ]]; then
      dry "git merge --ff-only origin/$BRANCH"
    else
      git -C "$ROOT" merge --quiet --ff-only "origin/$BRANCH"
    fi
  fi
  ok "Working copy matches origin/$BRANCH at $(short "$TARGET_SHA")"
}

# ── Containers ───────────────────────────────────────────────────────────────────────────────────
wait_healthy() {
  local container=$1 deadline=$((SECONDS + HEALTH_TIMEOUT)) state
  while ((SECONDS < deadline)); do
    state=$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}} {{.State.Status}}' "$container" 2>/dev/null || echo "missing missing")
    case $state in
      "healthy "*) return 0 ;;
      "unhealthy "* | *" exited" | *" dead" | "missing "*) return 1 ;;
    esac
    sleep 1
  done
  return 1
}

app_container() { compose ps -q app 2>/dev/null || true; }

app_healthy_on() {
  local cid
  cid=$(app_container)
  [[ -n $cid ]] || return 1
  [[ $(docker inspect -f '{{.State.Health.Status}}' "$cid" 2>/dev/null) == healthy ]] || return 1
  [[ $(docker inspect -f '{{.Image}}' "$cid") == "$(docker image inspect -f '{{.Id}}' "$IMAGE:$1" 2>/dev/null)" ]]
}

build_image() {
  local tag="$IMAGE:$TARGET_SHA"
  step "Building $tag"
  if image_exists "$tag" && [[ $FORCE != true ]]; then
    ok "Image already built, reusing it"
    return
  fi
  local args=(--label "$LABEL" --build-arg "GIT_SHA=$TARGET_SHA" -t "$tag")
  local var
  for var in NEXT_PUBLIC_SITE_URL NEXT_PUBLIC_CALENDAR_URL NEXT_PUBLIC_ANALYTICS NEXT_PUBLIC_PLAUSIBLE_DOMAIN \
    NEXT_PUBLIC_PLAUSIBLE_SRC NEXT_PUBLIC_UMAMI_WEBSITE_ID NEXT_PUBLIC_UMAMI_SRC; do
    args+=(--build-arg "$var=${!var:-}")
  done
  docker build "${args[@]}" "$ROOT"
  ok "Built $(short "$TARGET_SHA") ($(image_size "$tag"))"
}

image_size() { docker image inspect -f '{{.Size}}' "$1" | awk '{printf "%.0f MB", $1 / 1e6}'; }

remove_candidate() { docker rm -f "$CANDIDATE" >/dev/null 2>&1 || true; }

check_candidate() {
  step "Health-checking the new image before switching traffic"
  remove_candidate
  docker run -d --name "$CANDIDATE" --label "$LABEL" --read-only --tmpfs /tmp \
    --tmpfs /app/.next/cache:uid=1000,gid=1000 --cap-drop ALL --security-opt no-new-privileges:true \
    --memory 384m --health-interval 2s --health-start-period 5s --health-start-interval 1s --health-retries 3 \
    "$IMAGE:$TARGET_SHA" >/dev/null
  if wait_healthy "$CANDIDATE" && docker exec "$CANDIDATE" wget -qO /dev/null http://127.0.0.1:3000/en &&
    docker exec "$CANDIDATE" wget -qO /dev/null http://127.0.0.1:3000/fr; then
    ok "Healthy, /en and /fr render"
    remove_candidate
    return
  fi
  warn "Last 50 log lines of the new container:"
  docker logs --tail 50 "$CANDIDATE" >&2 || true
  remove_candidate
  die "The new image failed its health check within ${HEALTH_TIMEOUT}s. The running site was not touched."
}

sync_extra_sites() {
  mkdir -p "$STATE_DIR/caddy-sites"
  if [[ $ANALYTICS_SELF_HOSTED == true ]]; then
    cp "$ROOT/deploy/caddy/sites-available/analytics.caddy" "$STATE_DIR/caddy-sites/analytics.caddy"
  else
    rm -f "$STATE_DIR/caddy-sites/analytics.caddy"
  fi
}

# Points the "live" tag at a SHA and recreates the app container from it.
switch_to() {
  docker tag "$IMAGE:$1" "$IMAGE:live"
  compose up -d --no-deps --force-recreate --wait --wait-timeout "$HEALTH_TIMEOUT" app
}

record_deploy() {
  printf '%s\n' "$1" >"$STATE_DIR/current"
  [[ ${2:-} == history ]] && printf '%s %s\n' "$(date -u +%FT%TZ)" "$1" >>"$STATE_DIR/history"
  return 0
}

start_edge() {
  sync_extra_sites
  if [[ $PROXY_MODE == standalone ]]; then
    compose up -d --no-deps --wait caddy
    local out
    out=$(compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile 2>&1) ||
      die "Caddy rejected its configuration:"$'\n'"$out"
    ok "Caddy running and reloaded"
  fi
  if [[ $ANALYTICS_SELF_HOSTED == true ]]; then
    compose up -d --wait umami-db umami
    ok "Umami running"
  fi
}

switch_traffic() {
  step "Switching traffic to $(short "$TARGET_SHA")"
  local previous
  previous=$(deployed_sha)
  if ! switch_to "$TARGET_SHA"; then
    warn "Last 50 log lines:"
    compose logs --tail 50 app >&2 || true
    if [[ -n $previous ]] && image_exists "$IMAGE:$previous"; then
      warn "Restoring $(short "$previous")"
      switch_to "$previous" || true
      die "Switch failed; restored the previous version $(short "$previous")."
    fi
    die "Switch failed and there is no previous image to restore."
  fi
  record_deploy "$TARGET_SHA" history
  ok "App container recreated from $(short "$TARGET_SHA") and healthy"
  start_edge
}

prune_images() {
  step "Pruning this project's old images (keeping the last $KEEP_IMAGES)"
  local keep=() tag current
  current=$(deployed_sha)
  [[ -n $current ]] && keep+=("$current")
  if [[ -f $STATE_DIR/history ]]; then
    while read -r _ tag; do
      [[ " ${keep[*]} " == *" $tag "* ]] || keep+=("$tag")
      ((${#keep[@]} >= KEEP_IMAGES)) && break
    done < <(tac "$STATE_DIR/history")
  fi
  local removed=0
  while read -r tag; do
    [[ $tag == live || $tag == "<none>" || " ${keep[*]} " == *" $tag "* ]] && continue
    # Only images this project built (label), even if another stack reuses the image name.
    [[ $(docker image inspect -f '{{index .Config.Labels "app.lucaszivan.project"}}' "$IMAGE:$tag" 2>/dev/null) == "$PROJECT" ]] || continue
    if docker rmi "$IMAGE:$tag" >/dev/null 2>&1; then removed=$((removed + 1)); fi
  done < <(docker image ls "$IMAGE" --format '{{.Tag}}')
  docker image prune -f --filter "label=$LABEL" >/dev/null
  ok "Removed $removed old image(s); kept: $(for s in "${keep[@]}"; do printf '%s ' "$(short "$s")"; done)"
  info "${DIM}Build cache is shared with other projects on this host and is left alone.${RESET}"
}

# ── Smoke test ───────────────────────────────────────────────────────────────────────────────────
smoke_test() {
  step "Smoke test"
  local base=${SMOKE_URL:-https://$DOMAIN} failures=0 code headers header path
  local curl_opts=(-sS --max-time 10 --retry 6 --retry-delay 5 --retry-all-errors)
  [[ ${SMOKE_INSECURE:-false} == true ]] && curl_opts+=(-k)
  for path in /en /fr; do
    code=$(curl "${curl_opts[@]}" -o /dev/null -w '%{http_code}' "$base$path" 2>/dev/null) || code=000
    if [[ $code == 200 ]]; then ok "$base$path → 200"; else
      warn "$base$path → $code"
      failures=$((failures + 1))
    fi
  done
  headers=$(curl "${curl_opts[@]}" -o /dev/null -D - "$base/en" 2>/dev/null || true)
  for header in strict-transport-security x-content-type-options referrer-policy content-security-policy; do
    if grep -qi "^$header:" <<<"$headers"; then ok "header $header"; else
      warn "missing header $header"
      failures=$((failures + 1))
    fi
  done
  if [[ ${SMOKE_INSECURE:-false} != true && $base == https://* ]]; then
    local host=${base#https://} cert
    host=${host%%/*}
    [[ $host == *:* ]] || host="$host:443"
    if cert=$(openssl s_client -connect "$host" -servername "${host%%:*}" </dev/null 2>/dev/null |
      openssl x509 -noout -enddate -checkend 1209600 2>/dev/null); then
      ok "TLS certificate valid, ${cert%%$'\n'*}"
    else
      warn "TLS certificate missing, invalid or expiring within 14 days: ${cert:-no certificate}"
      failures=$((failures + 1))
    fi
  fi
  if ((failures > 0)); then
    warn "Hints: DNS not pointing here yet, certificate still being issued (see ./deploy.sh --logs), or proxy not configured."
    return 1
  fi
}

# ── Actions ──────────────────────────────────────────────────────────────────────────────────────
summary() {
  step "Deployed"
  info "SHA        $TARGET_SHA"
  info "URL        ${SMOKE_URL:-https://$DOMAIN}"
  info "Image      $IMAGE:$(short "$TARGET_SHA") ($(image_size "$IMAGE:$TARGET_SHA"))"
  info "Duration   $((SECONDS - START_SECONDS))s"
}

do_deploy() {
  require_not_root
  load_env
  preflight
  take_lock
  sync_repo

  local current
  current=$(deployed_sha)
  step "Plan"
  if [[ $current == "$TARGET_SHA" && $FORCE != true ]]; then
    if app_healthy_on "$TARGET_SHA"; then
      ok "$(short "$TARGET_SHA") is already deployed and healthy. Nothing to do (use --force to redeploy)."
      return 0
    fi
    warn "$(short "$TARGET_SHA") is recorded as deployed but its container is not healthy: redeploying."
  fi
  if [[ -z $current ]]; then
    info "First deployment of $(short "$TARGET_SHA")"
  elif [[ $current != "$TARGET_SHA" ]]; then
    info "$(short "$current") → $(short "$TARGET_SHA")"
    if git -C "$ROOT" merge-base --is-ancestor "$current" "$TARGET_SHA" 2>/dev/null; then
      git -C "$ROOT" log --oneline --no-decorate "$current..$TARGET_SHA" | sed 's/^/      /'
    fi
  fi

  if [[ $DRY_RUN == true ]]; then
    dry "docker build -t $IMAGE:$(short "$TARGET_SHA") (unless it exists)"
    dry "run it as $CANDIDATE and wait up to ${HEALTH_TIMEOUT}s for healthy + /en and /fr"
    dry "tag it $IMAGE:live and recreate the app container (compose project $PROJECT)"
    [[ $PROXY_MODE == standalone ]] && dry "start/reload Caddy on ports ${HTTP_PORT:-80}/${HTTPS_PORT:-443}"
    dry "keep the last $KEEP_IMAGES images, smoke-test ${SMOKE_URL:-https://$DOMAIN}"
    ok "Dry run complete; nothing was changed."
    return 0
  fi

  build_image
  check_candidate
  switch_traffic
  prune_images
  smoke_test || die "Deployed and healthy, but the public smoke test failed (see hints above)."
  summary
}

do_rollback() {
  require_not_root
  load_env
  preflight
  take_lock
  local current target='' found=false sha
  current=$(deployed_sha)
  [[ -f $STATE_DIR/history ]] || die "No deploy history yet."
  # The deploy recorded just before the current one (walking the history backwards).
  while read -r _ sha; do
    if [[ $found == true && $sha != "$current" ]] && image_exists "$IMAGE:$sha"; then
      target=$sha
      break
    fi
    [[ $sha == "$current" ]] && found=true
  done < <(tac "$STATE_DIR/history")
  [[ -n $target ]] || die "No earlier image available to roll back to (kept: last $KEEP_IMAGES)."

  step "Rolling back $(short "$current") → $(short "$target")"
  if [[ $DRY_RUN == true ]]; then
    dry "tag $IMAGE:$(short "$target") as live and recreate the app container"
    return 0
  fi
  TARGET_SHA=$target
  switch_to "$target" || die "Rollback failed; check ./deploy.sh --logs"
  record_deploy "$target"
  ok "Serving $(short "$target")"
  smoke_test || warn "Smoke test failed after rollback."
  warn "The working copy is still at $(short "$(git -C "$ROOT" rev-parse HEAD)"). The next ./deploy.sh redeploys origin/$BRANCH;"
  warn "revert the faulty commit on $BRANCH first if you want to stay on $(short "$target")."
}

do_status() {
  require_not_root
  load_env
  local current
  current=$(deployed_sha)
  step "lucaszivan.app — $PROXY_MODE mode"
  info "Deployed      ${current:-none}"
  info "Working copy  $(git -C "$ROOT" rev-parse HEAD) ($(git -C "$ROOT" symbolic-ref --short -q HEAD || echo detached))"
  info "origin/$BRANCH $(git -C "$ROOT" rev-parse -q --verify "origin/$BRANCH" || echo unknown) (as of the last fetch)"
  step "Containers"
  compose ps
  step "Images"
  docker image ls "$IMAGE" --format '    {{.Tag}}\t{{.Size}}\t{{.CreatedSince}}'
  if [[ -f $STATE_DIR/history ]]; then
    step "Recent deploys"
    tail -n 5 "$STATE_DIR/history" | sed 's/^/    /'
  fi
}

do_logs() {
  require_not_root
  load_env
  compose logs -f --tail "${LOG_LINES:-100}"
}

main() {
  while (($#)); do
    case $1 in
      --dry-run) DRY_RUN=true ;;
      --force) FORCE=true ;;
      --rollback) ACTION=rollback ;;
      --status) ACTION=status ;;
      --logs) ACTION=logs ;;
      -h | --help) ACTION=help ;;
      *)
        usage >&2
        die "Unknown option: $1"
        ;;
    esac
    shift
  done
  cd "$ROOT"
  case $ACTION in
    deploy) do_deploy ;;
    rollback) do_rollback ;;
    status) do_status ;;
    logs) do_logs ;;
    help) usage ;;
  esac
}

main "$@"
