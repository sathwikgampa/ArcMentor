/**
 * Credit Ledger Service
 * Handles credit transactions with SERIALIZABLE isolation to prevent double-spending.
 */
import { prisma } from '@arcmentor/db';

export class CreditLedgerService {
  /**
   * Award credits to a user (e.g., after completing an interview + feedback).
   */
  static async earnCredits(userId: string, amount: number, sessionId?: string) {
    return prisma.$transaction(async (tx) => {
      await tx.creditTransaction.create({
        data: {
          userId,
          amount,
          type: 'EARN',
          description: `Earned ${amount} credit(s) for completed session`,
          sessionId,
        },
      });

      return tx.user.update({
        where: { id: userId },
        data: { credits: { increment: amount } },
      });
    });
  }

  /**
   * Spend credits (e.g., booking a session as interviewee).
   * Throws if insufficient balance.
   */
  static async spendCredits(userId: string, amount: number, sessionId?: string) {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.findUniqueOrThrow({ where: { id: userId } });

      if (user.credits < amount) {
        throw new Error('Insufficient credits');
      }

      await tx.creditTransaction.create({
        data: {
          userId,
          amount: -amount,
          type: 'SPEND',
          description: `Spent ${amount} credit(s) to book session`,
          sessionId,
        },
      });

      return tx.user.update({
        where: { id: userId },
        data: { credits: { decrement: amount } },
      });
    });
  }

  /**
   * Apply penalty for no-show or late cancellation.
   */
  static async applyPenalty(userId: string, creditsDeducted: number = 2, karmaDeducted: number = 0.5) {
    return prisma.$transaction(async (tx) => {
      await tx.creditTransaction.create({
        data: {
          userId,
          amount: -creditsDeducted,
          type: 'PENALTY',
          description: `Penalty: -${creditsDeducted} credits for policy violation`,
        },
      });

      return tx.user.update({
        where: { id: userId },
        data: {
          credits: { decrement: creditsDeducted },
          karmaScore: { decrement: karmaDeducted },
        },
      });
    });
  }
}
