FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# Install dependencies
COPY pnpm-workspace.yaml pnpm-lock.yaml* package.json ./
COPY packages/db/package.json ./packages/db/
COPY packages/types/package.json ./packages/types/
COPY apps/api-gateway/package.json ./apps/api-gateway/

RUN pnpm install --frozen-lockfile

# Copy source
COPY packages/ ./packages/
COPY apps/api-gateway/ ./apps/api-gateway/

# Generate Prisma client
RUN pnpm --filter @arcmentor/db run db:generate

# Build
RUN pnpm --filter @arcmentor/api-gateway run build

EXPOSE 4000

CMD ["node", "apps/api-gateway/dist/index.js"]
