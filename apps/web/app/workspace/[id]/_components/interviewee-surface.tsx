'use client';

import React, { useState } from 'react';
import {
  Terminal,
  CheckCircle2,
  XCircle,
  FileCode,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface IntervieweeSurfaceProps {
  children?: React.ReactNode;
}

export function IntervieweeSurface({ children }: IntervieweeSurfaceProps) {
  const [activeTab, setActiveTab] = useState<'console' | 'testcases'>('console');

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950/70">
      {/* Problem Statement & Constraints Header Panel */}
      <div className="shrink-0 p-4 border-b border-white/10 bg-slate-900/50 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#818CF8]">PROBLEM 01</span>
            <span className="text-slate-600">•</span>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Two Sum
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">
              Easy / Core
            </span>
          </div>

          <div className="text-[11px] font-mono text-slate-400">
            Memory Limit: 256MB • Time Limit: 2.0s
          </div>
        </div>

        {/* Problem Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Given an array of integers <code className="text-[#C7D2FE] bg-white/5 px-1.5 py-0.5 rounded font-mono text-xs">nums</code> and an integer <code className="text-[#C7D2FE] bg-white/5 px-1.5 py-0.5 rounded font-mono text-xs">target</code>, return indices of the two numbers such that they add up to <code className="text-[#C7D2FE] bg-white/5 px-1.5 py-0.5 rounded font-mono text-xs">target</code>. You may assume each input has exactly one solution, and you may not use the same element twice.
        </p>

        {/* Input/Output Examples & Constraints */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Example 1</span>
            <p className="text-slate-300 text-[11px]">
              <span className="text-slate-500">Input:</span> nums = [2, 7, 11, 15], target = 9
            </p>
            <p className="text-emerald-400 text-[11px]">
              <span className="text-slate-500">Output:</span> [0, 1]
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Constraints</span>
            <p className="text-slate-400 text-[11px] truncate">
              • 2 &le; nums.length &le; 10⁴
            </p>
            <p className="text-slate-400 text-[11px] truncate">
              • -10⁹ &le; nums[i] &le; 10⁹, Only one valid answer
            </p>
          </div>
        </div>
      </div>

      {/* Editor Surface (Children slot if provided) */}
      {children && (
        <div className="flex-1 min-h-0 overflow-hidden relative border-b border-white/10">
          {children}
        </div>
      )}

      {/* Execution Console (Terminal Window at the bottom) */}
      <div className="h-44 shrink-0 flex flex-col bg-[#0b0f19] border-t border-white/10 font-mono text-xs select-text">
        {/* Terminal Header Bar */}
        <div className="h-8 shrink-0 px-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Terminal Window Dots */}
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <Terminal className="w-3.5 h-3.5 text-[#818CF8]" />
            <span className="text-xs font-semibold text-slate-200">Execution Console</span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-slate-500">Node v20.x Isolated Sandbox</span>
            <span className="text-emerald-400 font-bold">2/3 PASSED</span>
          </div>
        </div>

        {/* Terminal Output Logs */}
        <div className="flex-1 p-3.5 overflow-y-auto space-y-1.5 text-xs font-mono leading-relaxed bg-slate-950">
          {/* Passed Log 1 (Green) */}
          <div className="flex items-start gap-2 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
            <div>
              <span className="font-bold">[PASS] Test Case 1:</span>{' '}
              <span className="text-slate-300">nums = [2, 7, 11, 15], target = 9</span>
              <span className="text-emerald-400 ml-2">→ Expected: [0, 1] | Got: [0, 1] (14ms)</span>
            </div>
          </div>

          {/* Passed Log 2 (Green) */}
          <div className="flex items-start gap-2 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
            <div>
              <span className="font-bold">[PASS] Test Case 2:</span>{' '}
              <span className="text-slate-300">nums = [3, 2, 4], target = 6</span>
              <span className="text-emerald-400 ml-2">→ Expected: [1, 2] | Got: [1, 2] (8ms)</span>
            </div>
          </div>

          {/* Failed Log 3 (Red) */}
          <div className="flex items-start gap-2 text-rose-400">
            <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-400" />
            <div>
              <span className="font-bold">[FAIL] Test Case 3:</span>{' '}
              <span className="text-slate-300">nums = [3, 3], target = 6 (Duplicates handling)</span>
              <span className="text-rose-400 ml-2">→ Expected: [0, 1] | Got: [0, 0] (Failed assertion)</span>
            </div>
          </div>

          {/* Console Summary */}
          <div className="pt-2 mt-2 border-t border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Tests completed: <strong className="text-white">3 total</strong></span>
            <span className="text-slate-400">Runtime: <strong className="text-slate-200">34ms</strong> • Memory: <strong className="text-slate-200">42.1 MB</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntervieweeSurface;
