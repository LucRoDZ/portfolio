# Multi-stage build for the Next.js standalone server. Requires Docker >= 25 (HEALTHCHECK --start-interval).
ARG NODE_IMAGE=node:24.22.1-alpine3.24

# ── 1. Dependencies: only the lockfile, so this layer is cached until dependencies change ──────────
FROM ${NODE_IMAGE} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ── 2. Build ──────────────────────────────────────────────────────────────────────────────────────
FROM ${NODE_IMAGE} AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build-time configuration. NEXT_PUBLIC_* values are inlined into the static pages and are public by
# definition: never pass secrets here. Runtime-only settings belong in the compose file instead.
ARG NEXT_PUBLIC_SITE_URL=https://lucaszivan.app
ARG NEXT_PUBLIC_CALENDAR_URL=
ARG NEXT_PUBLIC_ANALYTICS=
ARG NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
ARG NEXT_PUBLIC_PLAUSIBLE_SRC=
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID=
ARG NEXT_PUBLIC_UMAMI_SRC=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_CALENDAR_URL=$NEXT_PUBLIC_CALENDAR_URL \
    NEXT_PUBLIC_ANALYTICS=$NEXT_PUBLIC_ANALYTICS \
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN=$NEXT_PUBLIC_PLAUSIBLE_DOMAIN \
    NEXT_PUBLIC_PLAUSIBLE_SRC=$NEXT_PUBLIC_PLAUSIBLE_SRC \
    NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID \
    NEXT_PUBLIC_UMAMI_SRC=$NEXT_PUBLIC_UMAMI_SRC
RUN npm run build

# ── 3. Runtime: standalone server + static assets only, no npm, no source ─────────────────────────
FROM ${NODE_IMAGE} AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
# Files stay root-owned: the server (user "node") can read but not modify them.
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
# Last, so a new commit does not invalidate the layers above.
ARG GIT_SHA=unknown
ENV GIT_SHA=$GIT_SHA
LABEL org.opencontainers.image.source="https://github.com/LucRoDZ/portfolio" \
      org.opencontainers.image.revision=$GIT_SHA
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --start-interval=1s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "server.js"]
