/*
  Warnings:

  - You are about to drop the column `credits` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `users` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `fullName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `passwordHash` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CANDIDATE', 'ADMIN');

-- CreateEnum
CREATE TYPE "TargetTier" AS ENUM ('FAANG', 'HIGH_GROWTH_STARTUP', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('EARNED', 'SPENT', 'PENALTY', 'STARTER_GRANT');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- DropIndex
DROP INDEX "users_email_idx";

-- DropIndex
DROP INDEX "users_karmaScore_idx";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "credits",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "provider",
ADD COLUMN     "creditBalance" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "preferredLang" TEXT NOT NULL DEFAULT 'Java',
ADD COLUMN     "targetTier" "TargetTier" NOT NULL DEFAULT 'FAANG',
ALTER COLUMN "passwordHash" SET NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CANDIDATE';

-- CreateTable
CREATE TABLE "credit_ledgers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "TransactionType" NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credit_ledgers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slot_availabilities" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "domain" TEXT NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "slot_availabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interview_sessions" (
    "id" TEXT NOT NULL,
    "interviewerId" TEXT NOT NULL,
    "intervieweeId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'SCHEDULED',
    "roomToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "interview_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_rubrics" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "techCorrectness" INTEGER NOT NULL,
    "problemSolving" INTEGER NOT NULL,
    "communication" INTEGER NOT NULL,
    "codeQuality" INTEGER NOT NULL,
    "keyStrengths" TEXT NOT NULL,
    "areasForGrowth" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_rubrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "credit_ledgers_userId_idx" ON "credit_ledgers"("userId");

-- CreateIndex
CREATE INDEX "slot_availabilities_startTime_domain_isBooked_idx" ON "slot_availabilities"("startTime", "domain", "isBooked");

-- CreateIndex
CREATE UNIQUE INDEX "interview_sessions_roomToken_key" ON "interview_sessions"("roomToken");

-- CreateIndex
CREATE INDEX "interview_sessions_scheduledAt_status_idx" ON "interview_sessions"("scheduledAt", "status");

-- CreateIndex
CREATE UNIQUE INDEX "feedback_rubrics_sessionId_key" ON "feedback_rubrics"("sessionId");

-- AddForeignKey
ALTER TABLE "credit_ledgers" ADD CONSTRAINT "credit_ledgers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slot_availabilities" ADD CONSTRAINT "slot_availabilities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_sessions" ADD CONSTRAINT "interview_sessions_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_sessions" ADD CONSTRAINT "interview_sessions_intervieweeId_fkey" FOREIGN KEY ("intervieweeId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_rubrics" ADD CONSTRAINT "feedback_rubrics_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "interview_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_rubrics" ADD CONSTRAINT "feedback_rubrics_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_rubrics" ADD CONSTRAINT "feedback_rubrics_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
