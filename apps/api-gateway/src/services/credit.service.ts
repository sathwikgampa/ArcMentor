import { db, TransactionType } from '@p2p/db';

export interface TransactionResult {
  success: boolean;
  newBalance: number;
  transactionId: string;
}

export class CreditService {
  /**
   * Core transaction-safe credit operation with ACID guarantees.
   * Executes within an isolated database transaction to guarantee atomicity and consistency.
   */
  static async processTransaction(
    userId: string,
    amount: number,
    type: TransactionType,
    description: string,
  ): Promise<TransactionResult> {
    return db.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { creditBalance: true },
      });

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      if (amount < 0 && user.creditBalance + amount < 0) {
        throw new Error('Insufficient credit balance');
      }

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          creditBalance: {
            increment: amount,
          },
        },
        select: { creditBalance: true },
      });

      const ledgerEntry = await tx.creditLedger.create({
        data: {
          userId,
          amount,
          type,
          description,
        },
        select: { id: true },
      });

      return {
        success: true,
        newBalance: updatedUser.creditBalance,
        transactionId: ledgerEntry.id,
      };
    });
  }

  /**
   * Convenience method: Awards +1 EARNED credit to an interviewer upon feedback submission.
   */
  static async awardFeedbackCredit(
    interviewerId: string,
    sessionId: string,
  ): Promise<TransactionResult> {
    return this.processTransaction(
      interviewerId,
      1,
      TransactionType.EARNED,
      `Feedback submitted for interview session: ${sessionId}`,
    );
  }

  /**
   * Convenience method: Deducts -1 SPENT credit from an interviewee to book a session.
   */
  static async chargeSessionBooking(
    intervieweeId: string,
    sessionId: string,
  ): Promise<TransactionResult> {
    return this.processTransaction(
      intervieweeId,
      -1,
      TransactionType.SPENT,
      `Session booking fee for interview session: ${sessionId}`,
    );
  }

  /**
   * Convenience method: Deducts -2 PENALTY credits for a missed/no-show session.
   */
  static async penalizeNoShow(userId: string, sessionId: string): Promise<TransactionResult> {
    return this.processTransaction(
      userId,
      -2,
      TransactionType.PENALTY,
      `Penalty deduction for no-show on interview session: ${sessionId}`,
    );
  }
}
