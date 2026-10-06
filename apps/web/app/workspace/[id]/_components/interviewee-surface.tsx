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
  ChevronUp,
  ChevronDown,
  BookOpen,
  Lightbulb,
  Cpu,
  Zap,
  Check,
  Timer,
  ShieldAlert,
} from 'lucide-react';
import { useWorkspaceStore } from '@/lib/store/workspace-store';

interface IntervieweeSurfaceProps {
  children?: React.ReactNode;
}

export function IntervieweeSurface({ children }: IntervieweeSurfaceProps) {
  const { executionStatus, setExecutionStatus, addReaction } = useWorkspaceStore();
  const [activeTab, setActiveTab] = useState<'description' | 'hints'>('description');
  const [consoleTab, setConsoleTab] = useState<'results' | 'custom'>('results');
  const [consoleExpanded, setConsoleExpanded] = useState<boolean>(true);
  const [selectedCase, setSelectedCase] = useState<number>(0);

  const [testCases, setTestCases] = useState([
    { id: 1, nums: '[2, 7, 11, 15]', target: '9', expected: '[0, 1]', actual: '[0, 1]', time: '12ms', passed: true },
    { id: 2, nums: '[3, 2, 4]', target: '6', expected: '[1, 2]', actual: '[1, 2]', time: '8ms', passed: true },
    { id: 3, nums: '[3, 3]', target: '6', expected: '[0, 1]', actual: '[0, 1]', time: '11ms', passed: true },
  ]);

  const handleRunCode = () => {
    setExecutionStatus('running');
    setTimeout(() => {
      setExecutionStatus('success');
      addReaction('🚀', 'Live Sandbox');
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950/80">
      {/* 1. Problem Statement Header & Tab Bar */}
      <div className="shrink-0 border-b border-white/10 bg-slate-900/60 backdrop-blur-md">
        {/* Navigation Tabs */}
        <div className="px-4 pt-3 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`flex items-center gap-2 px-3 py-1.5 border-b-2 text-xs font-semibold transition-all ${
                activeTab === 'description'
                  ? 'border-[#5856D6] text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#818CF8]" />
              <span>Problem Description</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('hints')}
              className={`flex items-center gap-2 px-3 py-1.5 border-b-2 text-xs font-semibold transition-all ${
                activeTab === 'hints'
                  ? 'border-[#5856D6] text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Approach & Hints</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </button>
          </div>

          {/* Quick Badges */}
          <div className="hidden sm:flex items-center gap-2 pb-1.5">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
              Easy (Core FAANG)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950/80 text-[#C7D2FE] border border-indigo-800/40">
              Pass Rate: 91.2%
            </span>
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="p-3.5 space-y-2.5 max-h-48 overflow-y-auto">
          {activeTab === 'description' ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>1. Two Sum</span>
                  <span className="text-xs font-normal text-slate-400 font-mono">#arrays #hash-table</span>
                </h2>
                <div className="text-[11px] font-mono text-slate-400">
                  Time: <strong className="text-slate-200">2.0s</strong> • Memory: <strong className="text-slate-200">256MB</strong>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Given an array of integers <code className="text-[#C7D2FE] bg-white/5 px-1.5 py-0.5 rounded font-mono text-xs">nums</code> and an integer <code className="text-[#C7D2FE] bg-white/5 px-1.5 py-0.5 rounded font-mono text-xs">target</code>, return indices of the two numbers such that they add up to <code className="text-[#C7D2FE] bg-white/5 px-1.5 py-0.5 rounded font-mono text-xs">target</code>.
              </p>

              {/* Examples Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
                <div className="p-2 rounded-lg bg-slate-950/70 border border-white/5 space-y-0.5">
                  <span className="text-[10px] font-bold text-indigo-300 block uppercase">Example 1</span>
                  <p className="text-slate-300 text-[11px]">
                    <span className="text-slate-500">In:</span> nums = [2, 7, 11, 15], target = 9
                  </p>
                  <p className="text-emerald-400 text-[11px]">
                    <span className="text-slate-500">Out:</span> [0, 1] (nums[0] + nums[1] = 9)
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-slate-950/70 border border-white/5 space-y-0.5">
                  <span className="text-[10px] font-bold text-amber-300 block uppercase">Key Constraints</span>
                  <p className="text-slate-400 text-[11px]">
                    • 2 &le; nums.length &le; 10⁴
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    • Exactly one valid solution exists
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
                <span className="font-bold text-[11px] block text-amber-300 mb-1">💡 Optimal Hash Map Single-Pass</span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Rather than scanning all pairs in O(N²), maintain a map of visited values to indices. As you iterate through each element <code className="text-amber-200 font-mono">x</code>, check whether <code className="text-amber-200 font-mono">target - x</code> was already observed.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-[#818CF8]" />
                <span>Interviewer will calibrate for space-time trade-off discussions.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Monaco Editor Middle Section */}
      {children && (
        <div className="flex-1 min-h-[220px] overflow-hidden relative">
          {children}
        </div>
      )}

      {/* 3. Action Bar (Run Code & Submit Solution) */}
      <div className="h-11 shrink-0 px-4 bg-slate-900/90 border-t border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setConsoleExpanded(!consoleExpanded)}
            className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-[#818CF8]" />
            <span>Execution Console</span>
            {consoleExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
          <span className="text-slate-600">|</span>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            3/3 Passing
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleRunCode}
            disabled={executionStatus === 'running'}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-slate-100 text-xs font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {executionStatus === 'running' ? (
              <>
                <div className="w-3 h-3 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#818CF8] fill-[#818CF8]" />
                <span>Run Tests</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              handleRunCode();
              addReaction('🎉', 'Interviewer');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] text-white text-xs font-semibold transition-all hover:scale-105 active:scale-95"
          >
            <Zap className="w-3 h-3 fill-white" />
            <span>Submit Solution</span>
          </button>
        </div>
      </div>

      {/* 4. Execution Console / Test Results Drawer */}
      {consoleExpanded && (
        <div className="h-44 shrink-0 flex flex-col bg-[#0b0f19] font-mono text-xs border-t border-white/10 select-text">
          {/* Test Case Tabs */}
          <div className="h-8 shrink-0 px-3 bg-slate-950/80 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {testCases.map((tc, idx) => (
                <button
                  key={tc.id}
                  type="button"
                  onClick={() => setSelectedCase(idx)}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1.5 transition-all ${
                    selectedCase === idx
                      ? 'bg-[#5856D6]/30 text-[#C7D2FE] border border-[#5856D6]/50'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Case {idx + 1}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-[10px] text-slate-400">
              <span>Runtime: <strong className="text-emerald-400">12ms</strong> (Beats 98.4%)</span>
              <span className="text-slate-600">•</span>
              <span>Memory: <strong className="text-indigo-400">41.2 MB</strong></span>
            </div>
          </div>

          {/* Test Case Detail */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-[#090d16]">
            {executionStatus === 'running' ? (
              <div className="h-full flex items-center justify-center text-slate-400 gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-[#5856D6] border-t-transparent animate-spin" />
                <span>Compiling in sandboxed V8 runner...</span>
              </div>
            ) : (() => {
              const currentCase = (testCases[selectedCase] ?? testCases[0])!;
              return (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="p-2 rounded bg-slate-950 border border-white/5">
                    <span className="text-[10px] text-slate-500 uppercase block">Input</span>
                    <p className="text-slate-200 text-xs font-mono mt-0.5">
                      nums = {currentCase.nums}
                    </p>
                    <p className="text-slate-200 text-xs font-mono">
                      target = {currentCase.target}
                    </p>
                  </div>

                  <div className="p-2 rounded bg-slate-950 border border-white/5">
                    <span className="text-[10px] text-slate-500 uppercase block">Output</span>
                    <p className="text-emerald-400 text-xs font-mono font-bold mt-0.5">
                      {currentCase.actual}
                    </p>
                  </div>

                  <div className="p-2 rounded bg-slate-950 border border-white/5">
                    <span className="text-[10px] text-slate-500 uppercase block">Expected</span>
                    <p className="text-slate-300 text-xs font-mono mt-0.5">
                      {currentCase.expected}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

export default IntervieweeSurface;

