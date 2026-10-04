FROM node:20-alpine AS base
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY apps/web/package.json ./apps/web/

RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
RUN pnpm install --frozen-lockfile=false

COPY apps/web ./apps/web

WORKDIR /app/apps/web
EXPOSE 3000

CMD ["pnpm", "dev"]
