'use client';

import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Sparkles,
  Bot,
  Brain,
  TrendingUp,
  Award,
  CheckCircle2,
  ChevronRight,
  Volume2,
  VolumeX,
  MessageSquare,
  Activity,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Download,
  Share2,
} from 'lucide-react';
import { useWorkspaceStore } from '@/lib/store/workspace-store';

export function InterviewProView() {
  const { addReaction } = useWorkspaceStore();

  const [micActive, setMicActive] = useState<boolean>(true);
  const [camActive, setCamActive] = useState<boolean>(true);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(1);
  const [audioPlayback, setAudioPlayback] = useState<boolean>(true);

  const questions = [
    {
      id: 1,
      category: 'Data Structures & Logic',
      title: 'Optimal Lookup Architecture',
      prompt:
        'Explain how you would design an inverted lookup hash map to solve Two Sum in O(N) time with minimal space overhead.',
      probes: [
        'Ask how duplicate values (nums=[3,3], target=6) affect index collisions',
        'Probe memory overhead with 10⁷ integers in V8 heap',
        'Request mathematical proof of O(1) average lookup in hash bucket',
      ],
    },
    {
      id: 2,
      category: 'System Architecture & Scaling',
      title: 'High-Concurrency Matchmaking Radar',
      prompt:
        'How would you handle 50,000 concurrent mock interview room allocations using WebSocket clusters and Redis geospatial indexing?',
      probes: [
        'Inquire about split-brain prevention during Redis cluster failover',
        'Ask about backpressure handling in WebSocket gateway node',
        'Discuss WebRTC STUN/TURN fallback latency bounds',
      ],
    },
  ];

  const currentQ = (questions[activeQuestionIndex] ?? questions[0])!;
  const [selectedProbe, setSelectedProbe] = useState<string | null>(null);

  // Live NLP transcript stream simulation
  const [transcriptLines, setTranscriptLines] = useState<Array<{ id: number; speaker: string; text: string; keywords?: string[]; time: string }>>([
    {
      id: 1,
      speaker: 'AI Interviewer',
      text: 'Welcome Alex. Let us start with your approach to single-pass associative lookup.',
      time: '00:15',
    },
    {
      id: 2,
      speaker: 'Candidate',
      text: 'To avoid the quadratic O(N²) nested scan, I construct a Map where each iteration checks if target minus current element exists in the hash table.',
      keywords: ['quadratic O(N²)', 'Map', 'hash table', 'associative lookup'],
      time: '00:24',
    },
    {
      id: 3,
      speaker: 'Candidate',
      text: 'If the complement is present, we immediately return the stored index and current index. This guarantees single-pass O(N) runtime and O(N) auxiliary space.',
      keywords: ['complement', 'single-pass O(N)', 'auxiliary space'],
      time: '00:41',
    },
  ]);

  const handleApplyProbe = (probeText: string) => {
    setSelectedProbe(probeText);
    addReaction('🤖', 'InterviewPro AI');
    setTimeout(() => {
      setTranscriptLines((prev) => [
        ...prev,
        {
          id: Date.now(),
          speaker: 'AI Copilot Follow-up',
          text: probeText,
          keywords: ['AI Probe', 'Follow-up'],
          time: 'Live',
        },
      ]);
      setSelectedProbe(null);
    }, 1200);
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden bg-[#07090E] text-slate-100 select-none">
      {/* ======================================================== */}
      {/* LEFT/CENTER REGION (62%): Live Video Feed + Speech NLP HUD */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col h-full overflow-hidden border-r border-white/10 relative">
        {/* Top Stream Status Bar */}
        <div className="h-10 shrink-0 px-4 bg-[#0B0E17] border-b border-white/10 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
              <Bot className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-semibold">InterviewPro AI Session Engine</span>
            </div>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Whisper v3 NLP Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 font-mono">
              Speech Model: <strong className="text-cyan-400">99.2% Accuracy</strong>
            </span>
          </div>
        </div>

        {/* Candidate Video Stream Container with HUD Overlays */}
        <div className="flex-1 min-h-[300px] relative overflow-hidden bg-gradient-to-b from-[#0F1422] to-[#080B12] flex items-center justify-center p-4">
          {/* Ambient Lighting Halo */}
          <div className="absolute w-[500px] h-[300px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

          {/* Video Feed Simulation Box */}
          <div className="w-full max-w-2xl h-full max-h-[460px] rounded-2xl border border-white/15 bg-gradient-to-tr from-slate-900/90 via-slate-950/80 to-[#101426] shadow-[0_0_50px_rgba(79,70,229,0.25)] relative overflow-hidden flex flex-col justify-between p-4 group">
            {/* HUD Top Overlay */}
            <div className="flex items-center justify-between z-10">
              {/* Candidate Info Badge */}
              <div className="flex items-center gap-2.5 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-lg">
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs ring-1 ring-white/30">
                    AR
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white tracking-tight">Alex Rivera</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      L5 Full-Stack
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">Candidate ID: #984-AR</p>
                </div>
              </div>

              {/* Engagement & Eye Contact HUD Meter */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-slate-300">Engagement:</span>
                  <strong className="text-emerald-400 font-bold">96% High</strong>
                </div>
              </div>
            </div>

            {/* Video Center: Candidate Avatar / Camera Stream Simulation */}
            <div className="flex-1 flex flex-col items-center justify-center my-auto py-4 relative z-10">
              {camActive ? (
                <div className="relative flex flex-col items-center">
                  {/* Glowing Candidate Focus Rings */}
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-500/25 via-cyan-500/20 to-purple-500/25 blur-xl animate-pulse" />
                  
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-900 flex items-center justify-center text-white font-black text-3xl sm:text-4xl shadow-2xl ring-2 ring-indigo-400/50 relative">
                    AR
                    {/* Live indicator dot */}
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  {/* Candidate Speech Real-Time Equalizer Waveform */}
                  {micActive && (
                    <div className="mt-4 flex items-center gap-1 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-lg">
                      <span className="w-1 h-3 bg-cyan-400 rounded-full animate-audio-bar-1" />
                      <span className="w-1 h-6 bg-indigo-400 rounded-full animate-audio-bar-2" />
                      <span className="w-1 h-4 bg-emerald-400 rounded-full animate-audio-bar-3" />
                      <span className="w-1 h-7 bg-cyan-400 rounded-full animate-audio-bar-4" />
                      <span className="w-1 h-3 bg-purple-400 rounded-full animate-audio-bar-2" />
                      <span className="w-1 h-5 bg-indigo-400 rounded-full animate-audio-bar-3" />
                      <span className="text-[11px] font-mono font-medium text-slate-300 ml-1.5">
                        Speaking: 135 WPM
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <VideoOff className="w-8 h-8 text-slate-500" />
                  </div>
                  <span className="text-xs font-mono">Camera Feed Paused</span>
                </div>
              )}
            </div>

            {/* Bottom HUD Floating Controls */}
            <div className="flex items-center justify-between z-10 pt-2 border-t border-white/10 bg-slate-950/60 backdrop-blur-md px-3 py-2 rounded-xl">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>1080p 60fps VP9</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-semibold">18ms Latency</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMicActive(!micActive)}
                  className={`p-2 rounded-lg border text-xs transition-all ${
                    micActive
                      ? 'bg-white/10 border-white/15 text-white hover:bg-white/15'
                      : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  }`}
                  title={micActive ? 'Mute Microphone' : 'Unmute Microphone'}
                >
                  {micActive ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => setCamActive(!camActive)}
                  className={`p-2 rounded-lg border text-xs transition-all ${
                    camActive
                      ? 'bg-white/10 border-white/15 text-white hover:bg-white/15'
                      : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  }`}
                  title={camActive ? 'Turn Off Camera' : 'Turn On Camera'}
                >
                  {camActive ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  className="p-2 rounded-lg bg-white/10 border border-white/15 text-slate-300 hover:text-white transition-all"
                  title="Share Screen"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Active Question Card & AI Follow-up Suggestions */}
        <div className="shrink-0 p-4 bg-[#0A0D16] border-t border-white/10 space-y-3">
          {/* Question Banner */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-500/25 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold uppercase tracking-wider">
                  {currentQ.category}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-semibold text-white">
                  Question 0{currentQ.id} of 05
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAudioPlayback(!audioPlayback)}
                  className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                  title="Toggle AI Voice Playback"
                >
                  {audioPlayback ? <Volume2 className="w-3.5 h-3.5 text-indigo-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveQuestionIndex((prev) => (prev === 0 ? 1 : 0))}
                  className="text-[11px] font-mono text-indigo-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              "{currentQ.prompt}"
            </p>
          </div>

          {/* AI Follow-up Probe Scaffolds */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>AI Real-Time Suggested Probes (Click to inject into live session):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentQ.probes.map((probe, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleApplyProbe(probe)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-400/50 text-[11px] text-slate-300 hover:text-white transition-all text-left flex items-center gap-1.5 active:scale-95"
                >
                  <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0" />
                  <span>{probe}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* RIGHT REGION (38%): Real-Time AI Scorecard & Analytics Suite */}
      {/* ======================================================== */}
      <div className="w-full lg:w-[420px] shrink-0 flex flex-col h-full overflow-y-auto bg-[#090C14] p-4 sm:p-5 space-y-4">
        {/* 1. Overall Match Fit Score Card (Hero Radar) */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-purple-950/30 to-slate-900 border border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.2)] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                AI CANDIDATE FIT
              </span>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold">
              TOP 4% PROFILE
            </span>
          </div>

          <div className="flex items-center gap-4 pt-1">
            {/* Big Circular Progress Indicator */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#1E293B"
                  strokeWidth="5"
                  fill="transparent"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="url(#gradientScore)"
                  strokeWidth="5"
                  strokeDasharray="163"
                  strokeDashoffset="20"
                  strokeLinecap="round"
                  fill="transparent"
                />
                <defs>
                  <linearGradient id="gradientScore" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute text-center">
                <span className="text-lg font-bold font-mono text-white">88</span>
                <span className="text-[10px] text-slate-400 block -mt-1">%</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Strong Hire Recommendation
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Candidate exhibits rapid problem scoping and production-grade optimization intuitions.
              </p>
            </div>
          </div>
        </div>

        {/* 2. 4-Dimension Competency Progress Gauges */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3.5 shadow-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-semibold text-white">
                Live Cognitive & Tech Breakdown
              </h4>
            </div>
            <span className="text-[10px] font-mono text-slate-400">NLP Calibrated</span>
          </div>

          {/* Metric 1 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Technical Depth & Data Structures</span>
              <span className="font-mono font-bold text-emerald-400">94%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full w-[94%]" />
            </div>
          </div>

          {/* Metric 2 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Algorithmic Optimization & Big-O</span>
              <span className="font-mono font-bold text-indigo-400">90%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full w-[90%]" />
            </div>
          </div>

          {/* Metric 3 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Communication & Articulation</span>
              <span className="font-mono font-bold text-cyan-400">86%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full w-[86%]" />
            </div>
          </div>

          {/* Metric 4 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Speed & Problem Solving Agility</span>
              <span className="font-mono font-bold text-amber-400">84%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full w-[84%]" />
            </div>
          </div>
        </div>

        {/* 3. Live Speech Tone & Delivery Analytics */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Speech Pace</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold font-mono text-white">135</span>
              <span className="text-[10px] text-slate-400">WPM</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono block">● Optimal Pace</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Delivery Tone</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-white truncate">Articulate</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-mono block">● Confident & Calm</span>
          </div>
        </div>

        {/* 4. AI Detected Competency Badges */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
          <span className="text-xs font-semibold text-white block">
            Auto-Extracted Competencies:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              '✓ Hash Map Lookup',
              '✓ Single-Pass O(N)',
              '✓ Space Complexity',
              '✓ Collision Scoping',
              '✓ Clean Idioms',
              '✓ Boundary Safety',
            ].map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 5. Live NLP Transcription Stream */}
        <div className="flex-1 min-h-[180px] rounded-2xl bg-slate-950 border border-white/10 p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-semibold text-white">Live NLP Transcript</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Auto-transcribed</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 text-xs font-sans max-h-40">
            {transcriptLines.map((line) => (
              <div key={line.id} className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                  <span className={line.speaker === 'Candidate' ? 'text-indigo-400 font-bold' : 'text-cyan-400 font-bold'}>
                    {line.speaker}
                  </span>
                  <span>•</span>
                  <span>{line.time}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {line.text}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500">Real-time keyword indexing</span>
            <button
              type="button"
              onClick={() => addReaction('📋', 'Dossier')}
              className="text-[10px] font-mono text-indigo-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <Download className="w-2.5 h-2.5" />
              <span>Export Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewProView;
