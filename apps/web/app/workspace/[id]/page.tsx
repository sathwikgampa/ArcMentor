'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Code2,
  PenTool,
  Play,
  Clock,
  PhoneOff,
} from 'lucide-react';
import { CreditBadge } from '@/components/shared/credit-badge';
import { UserAvatar } from '@/components/shared/user-avatar';
import { CodeEditor } from './_components/code-editor';
import { IntervieweeSurface } from './_components/interviewee-surface';
import { InterviewerSurface } from './_components/interviewer-surface';
import { AVGrid } from './_components/a-v-grid';

// Dynamically import Whiteboard with ssr: false
const Whiteboard = dynamic(() => import('./_components/whiteboard'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-950 text-slate-400 font-mono text-xs">
      <div className="flex items-center gap-2">
        <div className="w-3.5 h-3.5 rounded-full border-2 border-[#5856D6] border-t-transparent animate-spin" />
        <span>Loading Whiteboard Canvas...</span>
      </div>
    </div>
  ),
});

interface WorkspacePageProps {
  params: Promise<{ id: string }>;
}

export default function WorkspacePage({ params }: WorkspacePageProps) {
  const resolvedParams = use(params);
  const roomId = resolvedParams?.id || 'live-session';

  // State
  const [activeView, setActiveView] = useState<'code' | 'whiteboard'>('code');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(
    `/**\n * Problem: Two Sum\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}\n\nconsole.log(twoSum([2, 7, 11, 15], 9));`
  );
  const [isRunning, setIsRunning] = useState(false);

  // Timer countdown simulation
  const [secondsRemaining, setSecondsRemaining] = useState(300); // 5 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 h-screen overflow-hidden flex flex-col bg-slate-950 text-slate-50 select-none">
      {/* 1. Minimal Header */}
      <header className="h-14 shrink-0 px-4 sm:px-6 flex items-center justify-between border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        {/* Left: Text Logo & Room Tag */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-bold text-white hover:text-slate-200 transition-colors"
          >
            <span className="text-[#5856D6] font-extrabold text-xl">⚡</span>
            <span>ArcMentor</span>
          </Link>
          <span className="text-slate-600">/</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
              Room #{roomId.slice(0, 8)}
            </span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 px-2 py-0.5 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>
        </div>

        {/* Center: System Status */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Latency: <strong className="text-emerald-400 font-semibold">24ms</strong></span>
          <span className="text-slate-700">•</span>
          <span>WebRTC P2P: <strong className="text-indigo-400 font-semibold">LiveKit v1.8</strong></span>
        </div>

        {/* Right: Credits, Avatar, End Session */}
        <div className="flex items-center gap-3 sm:gap-4">
          <CreditBadge />
          <UserAvatar fallback="DM" size="sm" />
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-semibold transition-all hover:scale-105"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>End Session</span>
          </Link>
        </div>
      </header>

      {/* 2. Main Workspace Split Panes */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden w-full divide-x divide-white/10">
        {/* ======================================================== */}
        {/* LEFT PANE (70% width, col-span-8): IDE / Whiteboard + Problem */}
        {/* ======================================================== */}
        <section className="col-span-8 h-full flex flex-col overflow-hidden bg-slate-950/60">
          {/* 3. Control Header above Left Pane */}
          <div className="h-12 shrink-0 px-4 flex items-center justify-between border-b border-white/10 bg-slate-900/40">
            {/* Glowing text timer */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="font-mono text-xs sm:text-sm font-bold text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                  Phase 1: Problem Intro - {formatTimer(secondsRemaining)}
                </span>
              </div>
            </div>

            {/* Toggle switch between "Code" and "Whiteboard" */}
            <div className="flex items-center p-1 bg-slate-900 border border-white/10 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveView('code')}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeView === 'code'
                    ? 'bg-[#5856D6] text-white shadow-[0_0_14px_rgba(88,86,214,0.6)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Code</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView('whiteboard')}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeView === 'whiteboard'
                    ? 'bg-[#5856D6] text-white shadow-[0_0_14px_rgba(88,86,214,0.6)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Whiteboard</span>
              </button>
            </div>
          </div>

          {/* Main IDE or Whiteboard Canvas */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {activeView === 'code' ? (
              /* Left Pane: Interviewee Surface + Code Editor */
              <IntervieweeSurface>
                {/* Editor Bar */}
                <div className="h-9 shrink-0 px-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <span className="text-[#818CF8]">solution.js</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-slate-400 text-[11px]">JavaScript (Monaco Engine)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#5856D6] hover:bg-[#4E4CC4] text-white text-xs font-semibold shadow-[0_0_12px_rgba(88,86,214,0.4)] transition-all disabled:opacity-50"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                    </button>
                  </div>
                </div>

                {/* Monaco Code Editor */}
                <div className="h-[260px] w-full overflow-hidden">
                  <CodeEditor
                    language={selectedLanguage}
                    value={code}
                    onChange={(val) => setCode(val || '')}
                  />
                </div>
              </IntervieweeSurface>
            ) : (
              /* Dynamically loaded Whiteboard component */
              <div className="flex-1 h-full overflow-hidden">
                <Whiteboard roomId={roomId} />
              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* RIGHT PANE (30% width, col-span-4): A/V Grid & Rubric */}
        {/* ======================================================== */}
        <section className="col-span-4 h-full flex flex-col overflow-hidden bg-slate-950/90 divide-y divide-white/10">
          {/* Top Half: Audio/Video Grid using AVGrid wrapper */}
          <div className="h-[46%] shrink-0 flex flex-col bg-slate-900/30 overflow-hidden">
            <AVGrid />
          </div>

          {/* Bottom Half: Interviewer Assessment Surface */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <InterviewerSurface />
          </div>
        </section>
      </div>
    </div>
  );
}
