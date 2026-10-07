import { db, TransactionType } from '@p2p/db';
import { CreditService } from './credit.service';

export class CreditLedgerService {
  static async earnCredits(userId: string, amount: number, sessionId?: string) {
    return CreditService.processTransaction(
      userId,
      amount,
      TransactionType.EARNED,
      `Earned ${amount} credit(s) for completed session: ${sessionId || ''}`,
    );
  }

  static async spendCredits(userId: string, amount: number, sessionId?: string) {
    return CreditService.processTransaction(
      userId,
      -amount,
      TransactionType.SPENT,
      `Spent ${amount} credit(s) to book session: ${sessionId || ''}`,
    );
  }

  static async applyPenalty(userId: string, creditsDeducted: number = 2) {
    return CreditService.processTransaction(
      userId,
      -creditsDeducted,
      TransactionType.PENALTY,
      `Penalty: -${creditsDeducted} credits for policy violation`,
    );
  }
}
