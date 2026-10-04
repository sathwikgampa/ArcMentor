FROM node:20-alpine AS base
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

COPY package.json pnpm-workspace.yaml turbo.json ./
COPY packages/db/package.json ./packages/db/
COPY apps/background-workers/package.json ./apps/background-workers/

RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
RUN pnpm install --frozen-lockfile=false

COPY packages/db ./packages/db
COPY apps/background-workers ./apps/background-workers

RUN pnpm --filter @arcmentor/db generate

WORKDIR /app/apps/background-workers

CMD ["pnpm", "dev"]
