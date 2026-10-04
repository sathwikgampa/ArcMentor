FROM node:20-alpine AS base
WORKDIR /app

RUN apk add --no-cache libc6-compat docker-cli python3 g++ openjdk17-jre

COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/executor-service/package.json ./apps/executor-service/
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
RUN pnpm install --frozen-lockfile=false

COPY apps/executor-service ./apps/executor-service

WORKDIR /app/apps/executor-service
EXPOSE 5002

CMD ["pnpm", "dev"]
