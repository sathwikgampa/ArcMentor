import React from 'react';
import { Calendar, User, Star } from 'lucide-react';

interface FeedbackItem {
  id: string;
  date: string;
  role: string;
  interviewer: string;
  rating: number;
  note: string;
  strengths: string;
  focusArea: string;
}

const mockFeedbackHistory: FeedbackItem[] = [
  {
    id: 'fb-1',
    date: 'Oct 12, 2026',
    role: 'Senior Frontend Engineer',
    interviewer: '@alex_chen (Staff @ Google)',
    rating: 4.5,
    note: 'Strong React fundamentals, but review advanced rendering patterns.',
    strengths: 'Clean component modularity, hooks design, concise articulation.',
    focusArea: 'Profiling client re-renders and hydration edge cases.',
  },
  {
    id: 'fb-2',
    date: 'Oct 08, 2026',
    role: 'System Design & Distributed Systems',
    interviewer: '@marcus_v (Principal @ Stripe)',
    rating: 4.0,
    note: 'Exceptional edge-case handling for idempotency. Walked through replication tradeoffs cleanly.',
    strengths: 'Cache layer design, rate limiter partitioning logic.',
    focusArea: 'Consensus protocols under network partition scenarios.',
  },
  {
    id: 'fb-3',
    date: 'Oct 03, 2026',
    role: 'Data Structures & Algorithms',
    interviewer: '@priya_m (Senior @ Meta)',
    rating: 4.8,
    note: 'Clear bottleneck identification and communication. Consider deeper dive into LRU eviction subtleties.',
    strengths: 'Optimal time complexity analysis, fast syntax execution.',
    focusArea: 'Space complexity trade-offs in recursive memoization.',
  },
];

export function FeedbackTimeline() {
  return (
    <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#5856D6] before:via-[#818CF8]/40 before:to-slate-800">
      {mockFeedbackHistory.map((item, index) => (
        <div key={item.id} className="relative group">
          {/* Visual Timeline Node Dot */}
          <div className="absolute -left-6 sm:-left-8 top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-[#5856D6] flex items-center justify-center shadow-[0_0_12px_rgba(88,86,214,0.8)] group-hover:scale-125 transition-transform">
            <div className="w-1.5 h-1.5 rounded-full bg-[#818CF8]" />
          </div>

          {/* Feedback Entry Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200">
            {/* Header: Date & Rating */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-[#818CF8]" />
                {item.date}
              </span>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{item.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Role & Interviewer */}
            <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              {item.role}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
              <User className="w-3 h-3 text-slate-500" />
              <span>{item.interviewer}</span>
            </div>

            {/* Qualitative Diagnostic Note */}
            <div className="mt-3 p-3 rounded-lg bg-[#5856D6]/10 border border-[#5856D6]/20">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium italic">
                "{item.note}"
              </p>
            </div>

            {/* Key Strengths & Growth Areas */}
            <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-1 gap-2 text-xs">
              <div>
                <span className="font-semibold text-emerald-400 mr-1.5">Strength:</span>
                <span className="text-slate-300">{item.strengths}</span>
              </div>
              <div>
                <span className="font-semibold text-[#818CF8] mr-1.5">Focus:</span>
                <span className="text-slate-300">{item.focusArea}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedbackTimeline;
