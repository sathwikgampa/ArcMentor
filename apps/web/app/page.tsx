import Link from 'next/link';
import { ArrowRight, Search, Radio, SlidersHorizontal, Code2, ShieldCheck, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { UserAvatar } from '@/components/shared/user-avatar';

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden">
      {/* Background ambient light effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#5856D6]/25 to-transparent blur-[140px] -z-10" />
      <div className="pointer-events-none absolute top-1/3 left-10 w-[400px] h-[300px] bg-[#5856D6]/10 blur-[120px] -z-10" />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Top Tag / Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-white/15 text-xs font-medium text-slate-200 mb-8 shadow-[0_0_20px_rgba(88,86,214,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-[#818CF8]" />
          <span>Intelligent Peer Matchmaking Platform</span>
        </div>

        {/* 1. Bold Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1]">
          Real-time Mock Interviews with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5856D6] via-[#818CF8] to-[#C7D2FE]">
            Live Feedback.
          </span>
        </h1>

        {/* Descriptive Subheadline */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed">
          Practice technical rounds with verified peers across top tech tiers. 
          Conduct sessions to earn platform credits, sharpen real-time problem solving, 
          and receive calibrated rubric evaluations.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Primary CTA: Start Practicing */}
          <Link
            href="/schedule"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-[#5856D6] hover:bg-[#4E4CC4] shadow-[0_0_24px_rgba(88,86,214,0.5)] border border-[#5856D6]/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base group"
          >
            <span>Start Practicing</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary CTA: View Rubric */}
          <Link
            href="#rubric"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-slate-200 hover:text-white glass-panel hover:bg-white/10 border-white/15 transition-all duration-200 text-sm sm:text-base"
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>View Rubric</span>
          </Link>
        </div>

        {/* 2 & 3. Queue Simulation Preview Card (Centerpiece) */}
        <div className="relative w-full max-w-3xl mt-16 sm:mt-20">
          {/* Centerpiece ambient glow halo */}
          <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-[#5856D6]/40 via-purple-600/25 to-[#5856D6]/40 blur-2xl opacity-75 -z-10" />

          {/* Glass Panel Container */}
          <div className="glass-panel p-6 sm:p-8 border border-white/15 shadow-[0_0_50px_rgba(88,86,214,0.2)] text-left relative overflow-hidden">
            {/* Top Bar / Queue Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5856D6] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#5856D6] shadow-[0_0_8px_#5856D6]" />
                </span>
                <span className="text-xs font-mono font-medium tracking-wide text-slate-300">
                  MATCHMAKING RADAR
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  QUEUE ACTIVE
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  EST: ~1 MIN
                </span>
              </div>
            </div>

            {/* Radar & Avatars matching simulation */}
            <div className="py-6 sm:py-8 flex flex-col items-center justify-center text-center">
              <div className="relative flex items-center justify-center w-full max-w-md">
                {/* Pulsing indicator wave rings */}
                <div className="absolute w-44 sm:w-56 h-44 sm:h-56 rounded-full border border-[#5856D6]/20 animate-ping" />
                <div className="absolute w-32 sm:w-40 h-32 sm:h-40 rounded-full border border-[#5856D6]/35 animate-pulse" />

                {/* Left: Current Candidate Avatar */}
                <div className="flex flex-col items-center gap-2.5 z-10">
                  <div className="relative">
                    <UserAvatar
                      fallback="DM"
                      size="lg"
                      className="ring-4 ring-[#5856D6] shadow-[0_0_24px_rgba(88,86,214,0.7)]"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-slate-950" />
                  </div>
                  <span className="text-xs font-medium text-slate-300">You (Candidate)</span>
                </div>

                {/* Center: Real-time sync beam */}
                <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-6 z-10">
                  <div className="flex items-center w-full justify-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-[#5856D6]" />
                    <span className="h-[2px] flex-1 bg-gradient-to-r from-[#5856D6] via-[#818CF8] to-[#5856D6] shadow-[0_0_10px_#5856D6]" />
                    <div className="p-2 rounded-full bg-[#5856D6]/25 border border-[#5856D6]/50 shadow-[0_0_16px_rgba(88,86,214,0.6)]">
                      <Radio className="w-4 h-4 text-white" />
                    </div>
                    <span className="h-[2px] flex-1 bg-gradient-to-r from-[#5856D6] via-[#818CF8] to-[#5856D6] shadow-[0_0_10px_#5856D6]" />
                    <span className="w-2 h-2 rounded-full bg-[#5856D6]" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 mt-2 tracking-wider">
                    SCANNING POOL
                  </span>
                </div>

                {/* Right: Searching for Peer avatar placeholder */}
                <div className="flex flex-col items-center gap-2.5 z-10">
                  <div className="relative w-12 h-12 rounded-full border-2 border-dashed border-[#5856D6] bg-[#5856D6]/10 flex items-center justify-center shadow-[0_0_20px_rgba(88,86,214,0.4)] animate-pulse">
                    <Search className="w-5 h-5 text-[#818CF8] animate-bounce" />
                  </div>
                  <span className="text-xs font-medium text-slate-400">Peer Candidate</span>
                </div>
              </div>

              {/* Status Message Text */}
              <div className="mt-8">
                <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight flex items-center justify-center gap-2">
                  <span>Finding a Senior Frontend Engineer...</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-sm mx-auto">
                  Calibrating timezone, domain expertise, and reciprocal credits
                </p>
              </div>

              {/* Progress Shimmer Bar */}
              <div className="w-full max-w-md mt-6">
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span>Role: Frontend / Architecture</span>
                  <span className="text-[#818CF8]">Rank: Senior (L5)</span>
                </div>
                <div className="h-2 w-full bg-slate-900/90 rounded-full overflow-hidden border border-white/10 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#5856D6] via-[#818CF8] to-[#5856D6] rounded-full animate-pulse shadow-[0_0_12px_rgba(88,86,214,0.8)]"
                    style={{ width: '68%' }}
                  />
                </div>
              </div>

              {/* Matched Attribute Badges */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Role: React & Next.js Core
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#818CF8]" />
                  Reciprocal Ledger Locked (1 Credit)
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5856D6]" />
                  Sandboxed Monaco Editor
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="rubric" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Engineered for High-Trust Interviewing
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Everything you need for realistic practice and actionable performance tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 border border-white/10 hover:border-[#5856D6]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#5856D6]/20 border border-[#5856D6]/40 flex items-center justify-center text-[#818CF8] mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Dual-View Workspace</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Shared Monaco code editor, isolated compilation sandbox, progressive hints, and integrated phase timers.
            </p>
          </div>

          <div className="glass-panel p-6 border border-white/10 hover:border-[#5856D6]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#5856D6]/20 border border-[#5856D6]/40 flex items-center justify-center text-[#818CF8] mb-4">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">4D Evaluation Rubric</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Rate technical correctness, edge case handling, problem clarification, and behavioral STAR framework.
            </p>
          </div>

          <div className="glass-panel p-6 border border-white/10 hover:border-[#5856D6]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#5856D6]/20 border border-[#5856D6]/40 flex items-center justify-center text-[#818CF8] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Reciprocal Credit Economy</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Start with 2 free credits. Earn +1 by interviewing peers, spend -1 to practice. Guarded by karma ratings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
