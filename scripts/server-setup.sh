#!/usr/bin/env bash
# scripts/server-setup.sh — one-time setup of the OVH server for lucaszivan.app. Run it ONCE, as a
# sudo-capable admin user (not root), e.g. after copying it over:
#   scp scripts/server-setup.sh ubuntu@<server>:~ && ssh ubuntu@<server> ./server-setup.sh
# Every command is printed and needs a "y" before it runs. It never stops, removes or restarts existing
# containers, and never resets firewall rules. Safe to re-run: finished steps are detected and skipped.
set -Eeuo pipefail

DEPLOY_USER=${DEPLOY_USER:-deploy}
DEPLOY_PATH=${DEPLOY_PATH:-/srv/lucaszivan-portfolio}
REPO_SLUG=${REPO_SLUG:-LucRoDZ/portfolio}
DEPLOY_BRANCH=${DEPLOY_BRANCH:-master}
KEY_NAME=lucaszivan_portfolio_deploy
SSH_HOST_ALIAS=github-lucaszivan-portfolio

if [[ -t 1 ]]; then
  BOLD=$'\e[1m' BLUE=$'\e[34m' GREEN=$'\e[32m' YELLOW=$'\e[33m' RED=$'\e[31m' RESET=$'\e[0m'
else
  BOLD='' BLUE='' GREEN='' YELLOW='' RED='' RESET=''
fi
section() { printf '\n%s== %s ==%s\n' "$BOLD$BLUE" "$*" "$RESET"; }
note() { printf '%s\n' "$*"; }
ok() { printf '%s✓ %s%s\n' "$GREEN" "$*" "$RESET"; }
warn() { printf '%s! %s%s\n' "$YELLOW" "$*" "$RESET"; }
die() {
  printf '%s✗ %s%s\n' "$RED" "$*" "$RESET" >&2
  exit 1
}

# Prints a command, asks for confirmation, then runs it. "n" skips just that command.
run() {
  printf '\n%s+ %s%s\n' "$BOLD" "$*" "$RESET"
  local answer
  read -r -p "Run this? [y/N] " answer </dev/tty
  if [[ $answer =~ ^[Yy]$ ]]; then
    "$@"
  else
    warn "Skipped."
  fi
}

as_deploy() { sudo -u "$DEPLOY_USER" -H "$@"; }

usage() {
  cat <<EOF
Usage: ./server-setup.sh
Environment overrides: DEPLOY_USER ($DEPLOY_USER), DEPLOY_PATH ($DEPLOY_PATH),
REPO_SLUG ($REPO_SLUG), DEPLOY_BRANCH ($DEPLOY_BRANCH).
EOF
}

[[ ${1:-} == -h || ${1:-} == --help ]] && {
  usage
  exit 0
}
[[ $(id -u) -ne 0 ]] || die "Run as a sudo-capable admin user, not root."
command -v sudo >/dev/null || die "sudo is required."
[[ -r /etc/os-release ]] || die "Cannot detect the OS."
# shellcheck source=/dev/null
. /etc/os-release
[[ ${ID:-} == ubuntu || ${ID:-} == debian ]] || die "This script supports Ubuntu and Debian (found ${ID:-unknown})."

section "1. Docker Engine + compose plugin"
if command -v docker >/dev/null && docker compose version >/dev/null 2>&1; then
  ok "Docker $(docker --version | awk '{print $3}' | tr -d ,) and compose $(docker compose version --short) already installed; leaving them alone."
else
  note "Installs Docker from Docker's official apt repository (docs.docker.com/engine/install/$ID)."
  run sudo apt-get update
  run sudo apt-get install -y ca-certificates curl gnupg
  run sudo install -m 0755 -d /etc/apt/keyrings
  run sudo curl -fsSL "https://download.docker.com/linux/$ID/gpg" -o /etc/apt/keyrings/docker.asc
  run sudo chmod a+r /etc/apt/keyrings/docker.asc
  repo_line="deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/$ID ${VERSION_CODENAME} stable"
  run sudo sh -c "echo '$repo_line' > /etc/apt/sources.list.d/docker.list"
  run sudo apt-get update
  run sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi

section "2. Dedicated deploy user"
note "Recommended: a '$DEPLOY_USER' user that owns the repo and runs ./deploy.sh."
note "Trade-off: membership of the 'docker' group is equivalent to root on this host (it can mount / into a"
note "container). It still separates the deploy from your login, keeps GitHub keys off your account, and gives"
note "an audit trail. Rootless Docker avoids this but complicates ports 80/443 and the shared-proxy mode."
if id "$DEPLOY_USER" >/dev/null 2>&1; then
  ok "User $DEPLOY_USER exists."
else
  run sudo adduser --disabled-password --gecos "lucaszivan.app deploys" "$DEPLOY_USER"
fi
if id -nG "$DEPLOY_USER" 2>/dev/null | tr ' ' '\n' | grep -qx docker; then
  ok "$DEPLOY_USER is in the docker group."
else
  run sudo usermod -aG docker "$DEPLOY_USER"
fi
note "To SSH in directly as $DEPLOY_USER, add your laptop's public key to /home/$DEPLOY_USER/.ssh/authorized_keys"
note "(or keep logging in as your admin user and use: sudo -iu $DEPLOY_USER)."

section "3. Read-only GitHub deploy key"
key="/home/$DEPLOY_USER/.ssh/$KEY_NAME"
if sudo test -f "$key"; then
  ok "Deploy key exists: $key"
else
  run sudo -u "$DEPLOY_USER" -H mkdir -p "/home/$DEPLOY_USER/.ssh"
  run sudo -u "$DEPLOY_USER" -H chmod 700 "/home/$DEPLOY_USER/.ssh"
  run sudo -u "$DEPLOY_USER" -H ssh-keygen -t ed25519 -N "" -C "deploy@$(hostname) for $REPO_SLUG" -f "$key"
fi
ssh_config="/home/$DEPLOY_USER/.ssh/config"
if sudo test -f "$ssh_config" && sudo grep -q "Host $SSH_HOST_ALIAS" "$ssh_config"; then
  ok "SSH alias $SSH_HOST_ALIAS configured."
else
  block="Host $SSH_HOST_ALIAS
  HostName github.com
  User git
  IdentityFile $key
  IdentitiesOnly yes"
  run sudo -u "$DEPLOY_USER" -H sh -c "printf '%s\n\n' '$block' >> '$ssh_config' && chmod 600 '$ssh_config'"
fi
if sudo test -f "$key.pub"; then
  note ""
  note "Add this key on GitHub: https://github.com/$REPO_SLUG/settings/keys → Add deploy key"
  note "Title: $(hostname) deploy · Key:"
  sudo cat "$key.pub"
  note "Leave \"Allow write access\" UNCHECKED (read-only). Never put your personal GitHub credentials on the server."
  read -r -p "Press Enter once the key is added on GitHub… " _ </dev/tty
  if as_deploy ssh -o StrictHostKeyChecking=accept-new -T "git@$SSH_HOST_ALIAS" 2>&1 | grep -q "successfully authenticated"; then
    ok "GitHub accepts the deploy key."
  else
    warn "GitHub did not accept the key yet. Re-run this script after adding it."
  fi
fi

section "4. Repository at $DEPLOY_PATH"
if sudo test -d "$DEPLOY_PATH/.git"; then
  ok "Repository already cloned."
else
  run sudo mkdir -p "$DEPLOY_PATH"
  run sudo chown "$DEPLOY_USER:$DEPLOY_USER" "$DEPLOY_PATH"
  run sudo -u "$DEPLOY_USER" -H git clone --branch "$DEPLOY_BRANCH" "git@$SSH_HOST_ALIAS:$REPO_SLUG.git" "$DEPLOY_PATH"
fi
if sudo test -f "$DEPLOY_PATH/.env"; then
  ok ".env exists (not touched)."
elif sudo test -f "$DEPLOY_PATH/.env.example"; then
  run sudo -u "$DEPLOY_USER" -H cp "$DEPLOY_PATH/.env.example" "$DEPLOY_PATH/.env"
  run sudo chmod 600 "$DEPLOY_PATH/.env"
  note "Edit it now: sudo -u $DEPLOY_USER nano $DEPLOY_PATH/.env  (DOMAIN, PROXY_MODE, ACME_EMAIL, DEPLOY_BRANCH…)"
fi

section "5. Firewall (UFW): add missing rules only"
if ! command -v ufw >/dev/null; then
  warn "UFW not installed. Check the OVH network firewall instead (Control Panel → IP → Firewall)."
elif ! sudo ufw status | grep -q "Status: active"; then
  warn "UFW is inactive. Not enabling it from a script (risk of locking you out of SSH)."
  note "If you want it: sudo ufw allow 22/tcp && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw enable"
else
  for port in 22 80 443; do
    if sudo ufw status | grep -qE "^$port(/tcp)?[[:space:]]+ALLOW"; then
      ok "Port $port already allowed."
    else
      run sudo ufw allow "$port/tcp"
    fi
  done
  if ! sudo ufw status | grep -qE "^443/udp[[:space:]]+ALLOW"; then
    note "Optional, for HTTP/3 in standalone mode:"
    run sudo ufw allow 443/udp
  fi
fi

section "6. Existing services (read-only check)"
note "Listeners on 80/443 — if another stack (e.g. EASY.Q's nginx) owns them, use PROXY_MODE=shared-proxy:"
sudo ss -Htlnp 'sport = :80 or sport = :443' || true
note "Docker networks (for SHARED_PROXY_NETWORK):"
sudo docker network ls --format '  {{.Name}}' || true

section "7. DNS (OVH Control Panel → Web Cloud → Domains → lucaszivan.app → DNS zone)"
ipv4=$(curl -4 -fsS --max-time 5 https://api.ipify.org 2>/dev/null || echo "<server IPv4>")
ipv6=$(curl -6 -fsS --max-time 5 https://api64.ipify.org 2>/dev/null || echo "")
note "  lucaszivan.app.       A     $ipv4"
note "  www.lucaszivan.app.   A     $ipv4"
if [[ -n $ipv6 ]]; then
  note "  lucaszivan.app.       AAAA  $ipv6"
  note "  www.lucaszivan.app.   AAAA  $ipv6"
else
  note "  (No IPv6 detected: do not create AAAA records, or remove stale ones; a wrong AAAA breaks HTTPS for IPv6 users.)"
fi
note "Remove any old Vercel records (A 76.76.21.21, CNAME cname.vercel-dns.com) for these names."
note "TTL: lower to 300 s a day before switching, raise to 3600 s once stable."
note "Verify before the first deploy (all must print this server's address):"
note "  dig +short A lucaszivan.app @1.1.1.1 ; dig +short A www.lucaszivan.app @8.8.8.8"

section "Done"
note "Next, as $DEPLOY_USER:  cd $DEPLOY_PATH && ./deploy.sh --dry-run && ./deploy.sh"
