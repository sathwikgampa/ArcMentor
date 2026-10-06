import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Zap } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'earned' | 'spent';
  title: string;
  amount: string;
  date: string;
  details: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    type: 'earned',
    title: '+1 Earned - Conducted Interview',
    amount: '+1',
    date: 'Oct 14, 2026',
    details: 'System Design Peer Session • Feedback Submitted',
  },
  {
    id: 'tx-2',
    type: 'spent',
    title: '-1 Spent - Mock Interview',
    amount: '-1',
    date: 'Oct 12, 2026',
    details: 'Senior Frontend Practice • Escrow Settled',
  },
  {
    id: 'tx-3',
    type: 'earned',
    title: '+1 Earned - Conducted Interview',
    amount: '+1',
    date: 'Oct 10, 2026',
    details: 'Algorithms & LeetCode Round • 4D Rubric Scored',
  },
  {
    id: 'tx-4',
    type: 'spent',
    title: '-1 Spent - Mock Interview',
    amount: '-1',
    date: 'Oct 08, 2026',
    details: 'Distributed Systems Practice • Escrow Settled',
  },
  {
    id: 'tx-5',
    type: 'earned',
    title: '+2 Earned - Onboarding Starter Bonus',
    amount: '+2',
    date: 'Oct 01, 2026',
    details: 'Platform Registration & Profile Verification',
  },
];

export function CreditLedger() {
  return (
    <div className="w-full space-y-3">
      {/* Current Balance Bar */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Ledger Status</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">
            Escrow Active
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
          <span className="text-amber-400 text-sm">⚡</span>
          <span>5 Credits Available</span>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-2">
        {mockTransactions.map((tx) => {
          const isPositive = tx.type === 'earned';

          return (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/[0.04] transition-all"
            >
              {/* Left Side: Icon & Title */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isPositive
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40'
                      : 'bg-white/5 text-slate-400 border border-white/10'
                  }`}
                >
                  {isPositive ? (
                    <ArrowDownLeft className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>

                <div>
                  <h5
                    className={`text-xs sm:text-sm font-semibold tracking-tight ${
                      isPositive ? 'text-emerald-400' : 'text-slate-200'
                    }`}
                  >
                    {tx.title}
                  </h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {tx.details}
                  </p>
                </div>
              </div>

              {/* Right Side: Amount & Date */}
              <div className="text-right">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                    isPositive
                      ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/40'
                      : 'bg-white/5 text-slate-300 border border-white/10'
                  }`}
                >
                  <span className="text-amber-400 text-[10px]">⚡</span>
                  <span>{tx.amount}</span>
                </span>
                <p className="text-[10px] font-mono text-slate-500 mt-1">
                  {tx.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CreditLedger;
