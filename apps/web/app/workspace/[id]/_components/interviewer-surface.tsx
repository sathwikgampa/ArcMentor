'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Sliders,
  Sparkles,
  Lock,
  Code2,
  CheckCircle2,
} from 'lucide-react';

export function InterviewerSurface() {
  // Accordion state
  const [hintsOpen, setHintsOpen] = useState(true);
  const [activeHintIndex, setActiveHintIndex] = useState<number | null>(0);

  // Live Rubric Sliders State (1-5 scale)
  const [algorithmOptimization, setAlgorithmOptimization] = useState<number>(4);
  const [codeQuality, setCodeQuality] = useState<number>(5);
  const [interviewerNotes, setInterviewerNotes] = useState<string>('');

  const hints = [
    {
      title: 'Hint 1: Inverted Lookup with Hash Map',
      content:
        'Encourage the candidate to check if (target - current_num) already exists in a lookup table. This reduces time complexity from O(N²) brute-force to O(N) single-pass.',
    },
    {
      title: 'Hint 2: Handling Duplicate Values',
      content:
        'Verify how their map stores indices when identical numbers sum up to the target (e.g. nums=[3, 3], target=6). The same index must not be used twice.',
    },
    {
      title: 'Optimal Reference Solution (Hidden from Candidate)',
      content:
        'function twoSum(nums: number[], target: number): number[] {\n  const map = new Map<number, number>();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement)!, i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}',
      isCode: true,
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 sm:p-5 bg-slate-950/80 text-slate-100 space-y-5 select-none">
      {/* Problem Overview Banner */}
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#818CF8]">INTERVIEWER GUIDE</span>
            <span className="text-slate-600">•</span>
            <h3 className="text-sm font-bold text-white">Problem: Two Sum</h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">
            Phase 2: Technical Assessment
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Given array <code className="text-[#C7D2FE] bg-white/5 px-1 py-0.5 rounded font-mono">nums</code> and integer <code className="text-[#C7D2FE] bg-white/5 px-1 py-0.5 rounded font-mono">target</code>, return indices of two numbers that add up to target. Candidate should clarify edge cases before coding.
        </p>
      </div>

      {/* Accordion: Hidden Solution & Hints */}
      <div className="rounded-xl border border-white/10 overflow-hidden bg-slate-900/60 shadow-lg">
        {/* Accordion Trigger Header */}
        <button
          type="button"
          onClick={() => setHintsOpen(!hintsOpen)}
          className="w-full px-4 py-3 bg-white/5 hover:bg-white/[0.08] transition-colors flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#5856D6]/20 border border-[#5856D6]/40 flex items-center justify-center text-[#818CF8]">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white">
                Hidden Solution & Hints
              </h4>
              <p className="text-[11px] text-slate-400">
                Progressive hints to guide candidate during struggle
              </p>
            </div>
          </div>
          <div className="text-slate-400">
            {hintsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {/* Accordion Content */}
        {hintsOpen && (
          <div className="p-3.5 space-y-2.5 border-t border-white/10 bg-slate-950/50">
            {hints.map((hint, idx) => (
              <div
                key={hint.title}
                className="rounded-lg border border-white/5 overflow-hidden bg-white/[0.02]"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveHintIndex(activeHintIndex === idx ? null : idx)
                  }
                  className="w-full px-3 py-2 text-left flex items-center justify-between text-xs font-medium text-slate-300 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-mono">
                      {idx + 1}
                    </span>
                    <span>{hint.title}</span>
                  </span>
                  <span className="text-slate-500 text-xs">
                    {activeHintIndex === idx ? '▲' : '▼'}
                  </span>
                </button>

                {activeHintIndex === idx && (
                  <div className="px-3 pb-3 pt-1 text-xs text-slate-300 border-t border-white/5 bg-slate-900/40">
                    {hint.isCode ? (
                      <pre className="p-2.5 rounded bg-black/50 font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed border border-white/5">
                        {hint.content}
                      </pre>
                    ) : (
                      <p className="leading-relaxed">{hint.content}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Live Rubric Scorekeeper */}
      <div className="p-4 sm:p-5 rounded-xl border border-white/10 bg-slate-900/60 space-y-5 shadow-lg">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#818CF8]" />
            <h4 className="text-xs sm:text-sm font-semibold text-white">
              Live Rubric Scorekeeper
            </h4>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5856D6]/20 border border-[#5856D6]/40 text-[#C7D2FE]">
            Evaluation Scale: 1 - 5
          </span>
        </div>

        {/* 1. Algorithm Optimization Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label className="font-semibold text-slate-200">
              Algorithm Optimization
            </label>
            <span className="font-mono font-bold text-sm text-[#818CF8] bg-[#5856D6]/20 px-2 py-0.5 rounded border border-[#5856D6]/30">
              {algorithmOptimization} / 5
            </span>
          </div>

          {/* Slider Input */}
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={algorithmOptimization}
            onChange={(e) => setAlgorithmOptimization(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#5856D6]"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-0.5">
            <span>1 (Brute Force O(N²))</span>
            <span>3 (O(N log N))</span>
            <span className="text-emerald-400">5 (Optimal O(N))</span>
          </div>
        </div>

        {/* 2. Code Quality Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label className="font-semibold text-slate-200">
              Code Quality
            </label>
            <span className="font-mono font-bold text-sm text-[#818CF8] bg-[#5856D6]/20 px-2 py-0.5 rounded border border-[#5856D6]/30">
              {codeQuality} / 5
            </span>
          </div>

          {/* Slider Input */}
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={codeQuality}
            onChange={(e) => setCodeQuality(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#5856D6]"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-0.5">
            <span>1 (Disorganized)</span>
            <span>3 (Readable)</span>
            <span className="text-emerald-400">5 (Production-Grade)</span>
          </div>
        </div>

        {/* Diagnostic Notes Input */}
        <div className="space-y-1.5 pt-1">
          <label className="text-[11px] font-medium text-slate-400 block">
            Qualitative Evaluation Notes:
          </label>
          <textarea
            rows={2}
            value={interviewerNotes}
            onChange={(e) => setInterviewerNotes(e.target.value)}
            placeholder="Record strengths, edge case handling, or gaps..."
            className="w-full bg-slate-950 text-slate-200 text-xs p-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#5856D6] resize-none"
          />
        </div>
      </div>
    </div>
  );
}

export default InterviewerSurface;
