import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { TrendingUp, Receipt, History } from 'lucide-react';
import { SkillRadarChart } from './_components/skill-radar-chart';
import { CreditLedger } from './_components/credit-ledger';
import { FeedbackTimeline } from './_components/feedback-timeline';

export default function ProfilePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Candidate Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track your interview competencies, credit transactions, and historical feedback.
          </p>
        </div>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column (Top & Bottom Cards) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* 1. Skill Progression Card (Top Left) */}
          <Card className="glass-panel border-white/10 bg-white/5 text-white shadow-[0_0_30px_rgba(88,86,214,0.08)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#818CF8]" />
                  <span>Skill Progression</span>
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs sm:text-sm mt-1">
                  Radar map and performance metrics across evaluation dimensions.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <SkillRadarChart />
            </CardContent>
          </Card>

          {/* 2. Activity & Credit Ledger Card (Bottom Left) */}
          <Card className="glass-panel border-white/10 bg-white/5 text-white shadow-[0_0_30px_rgba(88,86,214,0.08)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-[#818CF8]" />
                  <span>Activity & Credit Ledger</span>
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs sm:text-sm mt-1">
                  Reciprocal interview credit history, escrow settlements, and penalties.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <CreditLedger />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Tall Historical Feedback Timeline Card */}
        <div className="lg:col-span-5 flex flex-col">
          {/* 3. Historical Feedback Timeline Card (Entire Right Column) */}
          <Card className="glass-panel border-white/10 bg-white/5 text-white shadow-[0_0_30px_rgba(88,86,214,0.08)] h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-[#818CF8]" />
                  <span>Historical Feedback Timeline</span>
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs sm:text-sm mt-1">
                  Chronological peer evaluations, qualitative notes, and STAR rubric breakdowns.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <FeedbackTimeline />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
