'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Code2,
  PenTool,
  Clock,
  PhoneOff,
  ArrowLeftRight,
  Share2,
  Maximize2,
  Minimize2,
  MessageSquare,
  Sliders,
  Sparkles,
  ShieldCheck,
  Check,
  Send,
  User,
  Radio,
  FileCode,
} from 'lucide-react';
import { CreditBadge } from '@/components/shared/credit-badge';
import { UserAvatar } from '@/components/shared/user-avatar';
import { CodeEditor } from './_components/code-editor';
import { IntervieweeSurface } from './_components/interviewee-surface';
import { InterviewerSurface } from './_components/interviewer-surface';
import { AVGrid } from './_components/a-v-grid';
import { InterviewProView } from './_components/interview-pro-view';
import { useWorkspaceStore } from '@/lib/store/workspace-store';

// Dynamically import Whiteboard with ssr: false
const Whiteboard = dynamic(() => import('./_components/whiteboard'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-950 text-slate-400 font-mono text-xs">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full border-2 border-[#5856D6] border-t-transparent animate-spin" />
        <span>Loading Architecture Whiteboard Canvas...</span>
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

  // Consume Zustand workspace store
  const {
    activeView,
    role,
    timeRemaining,
    activePhase,
    activeRightTab,
    setActiveView,
    toggleRole,
    decrementTime,
    setActivePhase,
    setActiveRightTab,
    addReaction,
  } = useWorkspaceStore();

  const [copiedLink, setCopiedLink] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string; isHost?: boolean }>>([
    { sender: 'Alex Chen', text: 'Welcome to your mock technical session! Feel free to clarify constraints before writing any code.', time: '14:00', isHost: true },
    { sender: 'You', text: 'Thanks Alex! Could the input array contain duplicate numbers or negative integers?', time: '14:01', isHost: false },
    { sender: 'Alex Chen', text: 'Yes, elements can be negative or positive. Each test case has exactly one valid solution pair.', time: '14:02', isHost: true },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Decrement time every 1000ms
  useEffect(() => {
    const timer = setInterval(() => {
      decrementTime();
    }, 1000);
    return () => clearInterval(timer);
  }, [decrementTime]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const phases = [
    { id: 1, name: '1. Scoping' },
    { id: 2, name: '2. Implementation' },
    { id: 3, name: '3. Test Cases' },
    { id: 4, name: '4. Rubric Debrief' },
  ];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([
      ...chatMessages,
      {
        sender: role === 'interviewer' ? 'Alex Chen' : 'You',
        text: chatInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isHost: role === 'interviewer',
      },
    ]);
    setChatInput('');
    addReaction('💬', 'Chat');
  };

  return (
    <div className="fixed inset-0 z-50 h-screen overflow-hidden flex flex-col bg-[#07090E] text-slate-50 select-none">
      {/* 1. Header with Gradient Accent Glow */}
      <header className="h-14 shrink-0 px-3 sm:px-6 flex items-center justify-between border-b border-white/10 bg-slate-950/90 backdrop-blur-xl relative z-30">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 opacity-60" />

        {/* Left: Brand Logo & View Selector Tabs */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-bold text-white hover:text-slate-200 transition-colors group"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#5856D6] to-indigo-400 flex items-center justify-center shadow-[0_0_15px_rgba(88,86,214,0.6)] group-hover:scale-105 transition-transform">
              <span className="text-white font-extrabold text-sm">⚡</span>
            </div>
            <span className="font-extrabold tracking-tight hidden sm:inline">ArcMentor</span>
          </Link>

          <span className="text-slate-700 hidden sm:inline">/</span>

          {/* View Mode Selector Tabs (InterviewPro AI vs IDE vs Whiteboard) */}
          <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveView('interview-pro')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'interview-pro'
                  ? 'bg-gradient-to-r from-[#5856D6] to-indigo-600 text-white shadow-[0_0_15px_rgba(88,86,214,0.6)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>InterviewPro AI</span>
              <span className="text-[9px] font-mono uppercase bg-cyan-500/20 text-cyan-300 px-1 py-0.2 rounded border border-cyan-500/30 ml-0.5">
                HUD
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('code')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'code'
                  ? 'bg-[#5856D6] text-white shadow-[0_0_15px_rgba(88,86,214,0.6)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>IDE Sandbox</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('whiteboard')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'whiteboard'
                  ? 'bg-[#5856D6] text-white shadow-[0_0_15px_rgba(88,86,214,0.6)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Architecture</span>
              <span>Board</span>
            </button>
          </div>
        </div>

        {/* Center: Phase Pipeline Interactive Tracker */}
        <div className="hidden xl:flex items-center gap-1 bg-white/[0.04] border border-white/10 p-1 rounded-xl">
          {phases.map((p) => {
            const isCurrent = activePhase === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePhase(p.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                  isCurrent
                    ? 'bg-[#5856D6] text-white shadow-[0_0_14px_rgba(88,86,214,0.6)] font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Right: Credits, Timer, Role Toggle, Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Phase Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{formatTimer(timeRemaining)}</span>
          </div>

          <div className="hidden sm:block">
            <CreditBadge />
          </div>

          {/* Role Toggle Button */}
          <button
            type="button"
            onClick={toggleRole}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/40 text-[#C7D2FE] text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Toggle between Interviewer and Candidate perspectives"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#818CF8]" />
            <span className="hidden md:inline">Role:</span>
            <strong className="capitalize text-white">{role}</strong>
          </button>

          {/* Share / Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
            title="Copy Session Link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>

          {/* End Session Button */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-semibold transition-all hover:scale-105"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">End</span>
          </Link>
        </div>
      </header>

      {/* 2. Main Workspace Body */}
      {activeView === 'interview-pro' ? (
        /* Full InterviewPro AI Live Platform View */
        <div className="flex-1 min-h-0 overflow-hidden">
          <InterviewProView />
        </div>
      ) : (
        /* IDE or Whiteboard Split Layout */
        <div className="flex-1 grid grid-cols-12 overflow-hidden w-full divide-x divide-white/10">
          {/* LEFT PANE (70% width, col-span-8): IDE / Whiteboard */}
          <section className="col-span-8 h-full flex flex-col overflow-hidden bg-slate-950/70">
            {activeView === 'code' ? (
              <IntervieweeSurface>
                <CodeEditor />
              </IntervieweeSurface>
            ) : (
              <div className="flex-1 h-full overflow-hidden">
                <Whiteboard roomId={roomId} />
              </div>
            )}
          </section>

          {/* RIGHT PANE (30% width, col-span-4): A/V Grid & Rubric/Chat */}
          <section className="col-span-4 h-full flex flex-col overflow-hidden bg-slate-950/95 divide-y divide-white/10">
            {/* Top Half: Audio / Video Tile */}
            <div className="h-[46%] shrink-0 flex flex-col bg-slate-900/30 overflow-hidden">
              <AVGrid
                interviewerName={role === 'interviewer' ? 'You (Interviewer)' : 'Alex Chen (Staff Eng)'}
                intervieweeName={role === 'interviewee' ? 'You (Candidate)' : 'Alex Chen (Candidate)'}
              />
            </div>

            {/* Right Pane Tab Bar */}
            <div className="h-10 shrink-0 px-3 bg-slate-900/60 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveRightTab('rubric')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    activeRightTab === 'rubric'
                      ? 'bg-white/10 text-white border border-white/10 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3 h-3 text-[#818CF8]" />
                  <span>Evaluation Rubric</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRightTab('chat')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all relative ${
                    activeRightTab === 'chat'
                      ? 'bg-white/10 text-white border border-white/10 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3 h-3 text-cyan-400" />
                  <span>Session Chat</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-0.5" />
                </button>
              </div>

              <span className="text-[10px] font-mono text-slate-500">
                {role === 'interviewer' ? 'Evaluator View' : 'Candidate View'}
              </span>
            </div>

            {/* Bottom Half: Tab Content */}
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
              {activeRightTab === 'rubric' ? (
                <InterviewerSurface />
              ) : (
                <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950/80">
                  <div className="flex-1 overflow-y-auto p-3.5 space-y-3 font-sans text-xs">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col ${msg.isHost ? 'items-start' : 'items-end'}`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400 font-mono">
                          <span className="font-semibold text-slate-300">{msg.sender}</span>
                          <span>•</span>
                          <span>{msg.time}</span>
                        </div>
                        <div
                          className={`p-2.5 rounded-xl max-w-[85%] leading-relaxed ${
                            msg.isHost
                              ? 'bg-white/5 border border-white/10 text-slate-200'
                              : 'bg-[#5856D6] text-white shadow-md'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={handleSendChat}
                    className="p-2.5 border-t border-white/10 bg-slate-900/60 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type code hint or question..."
                      className="flex-1 bg-slate-950 text-slate-100 text-xs px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#5856D6]"
                    />
                    <button
                      type="submit"
                      className="p-2 rounded-lg bg-[#5856D6] hover:bg-[#4E4CC4] text-white transition-all hover:scale-105 active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}


