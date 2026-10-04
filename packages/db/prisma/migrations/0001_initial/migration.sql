-- CreateTable: users
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "passwordHash" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'CREDENTIALS',
    "credits" INTEGER NOT NULL DEFAULT 2,
    "karmaScore" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "role" TEXT NOT NULL DEFAULT 'CANDIDATE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE INDEX "users_email_idx" ON "users"("email");
CREATE INDEX "users_karmaScore_idx" ON "users"("karmaScore");

-- This is an initial migration placeholder.
-- Run `npx prisma migrate dev` to generate proper migrations from schema.prisma.
