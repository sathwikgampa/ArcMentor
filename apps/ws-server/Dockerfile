FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml* package.json ./
COPY packages/types/package.json ./packages/types/
COPY packages/security/ ./packages/security/
COPY apps/ws-server/package.json ./apps/ws-server/

RUN pnpm install --frozen-lockfile

COPY packages/ ./packages/
COPY apps/ws-server/ ./apps/ws-server/

RUN pnpm --filter @arcmentor/ws-server run build

EXPOSE 4001

CMD ["node", "apps/ws-server/dist/index.js"]
