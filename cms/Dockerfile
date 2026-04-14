# Dockerfile for Payload CMS in pnpm monorepo
# Build from monorepo root: docker build --platform linux/amd64 -f apps/cms/Dockerfile -t olis-cms-dev .

FROM node:20.19-alpine AS base

# ============================================
# Install dependencies only when needed
# ============================================
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable Corepack for pnpm
RUN corepack enable pnpm

# Copy workspace configuration
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copy all package.json files
COPY apps/cms/package.json ./apps/cms/
# If you have shared packages:
# COPY packages/*/package.json ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile

# ============================================
# Rebuild the source code only when needed
# ============================================
FROM base AS builder
WORKDIR /app

# Enable Corepack for pnpm
RUN corepack enable pnpm

# Copy everything from deps (includes node_modules)
COPY --from=deps /app ./

# Copy source code
COPY apps/cms ./apps/cms
# If you have shared packages:
# COPY packages ./packages

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--no-deprecation --max-old-space-size=8000"

# Dummy env vars required for build steps (generate:importmap, next build).
# server.ts and client.ts validate env eagerly at import time, but these build
# steps don't use real connections — real values are injected at runtime via SSM.
ENV DATABASE_URL=http://placeholder \
    PAYLOAD_SECRET=placeholder \
    S3_BUCKET=placeholder \
    S3_ACCESS_KEY_ID=placeholder \
    S3_SECRET_ACCESS_KEY=placeholder \
    NEXT_PUBLIC_PAYLOAD_URL=http://placeholder \
    BASE_FRONTEND_URL=http://placeholder \
    CDN_URL=http://placeholder \
    S3_REGION=us-east-1 \
    LEGACY_DB_URI=mongodb://placeholder

# Generate Payload import map before building
RUN pnpm --filter @olis-lab/cms run generate:importmap

# Build
RUN pnpm --filter @olis-lab/cms exec next build

# ============================================
# Production image
# ============================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# CRITICAL: Copy the entire standalone output to /app
# This preserves the correct directory structure
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/standalone ./

# CRITICAL: Copy static assets to the correct location
# They need to be in apps/cms/.next/static for standalone to find them
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/static ./apps/cms/.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# Start from the correct directory
# Note: HOSTNAME is set via -e flag instead of ENV to avoid App Runner overriding it
CMD ["node", "-e", "process.env.HOSTNAME='0.0.0.0'; require('./apps/cms/server.js')"]