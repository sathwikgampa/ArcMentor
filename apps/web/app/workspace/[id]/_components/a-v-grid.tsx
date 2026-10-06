'use client';

import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Volume2,
  Signal,
  Smile,
  ShieldCheck,
  Radio,
  Share2,
} from 'lucide-react';
import { UserAvatar } from '@/components/shared/user-avatar';
import { useWorkspaceStore } from '@/lib/store/workspace-store';

interface AVGridProps {
  interviewerName?: string;
  intervieweeName?: string;
}

export function AVGrid({
  interviewerName = 'Alex Chen (Interviewer)',
  intervieweeName = 'You (Candidate)',
}: AVGridProps) {
  const { reactions, addReaction } = useWorkspaceStore();

  // Interviewer controls
  const [interviewerMic, setInterviewerMic] = useState<boolean>(true);
  const [interviewerCam, setInterviewerCam] = useState<boolean>(true);

  // Interviewee controls
  const [intervieweeMic, setIntervieweeMic] = useState<boolean>(true);
  const [intervieweeCam, setIntervieweeCam] = useState<boolean>(true);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);

  const emojiBar = ['👍', '🔥', '💡', '👏', '🎯', '❤️'];

  return (
    <div className="w-full h-full flex flex-col gap-2.5 p-3 sm:p-3.5 select-none relative overflow-hidden bg-slate-950/40">
      {/* Floating Reactions Overlay */}
      <div className="absolute right-4 bottom-14 pointer-events-none flex flex-col items-end gap-1.5 z-30">
        {reactions.slice(-4).map((r) => (
          <div
            key={r.id}
            className="text-2xl animate-bounce drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
          >
            {r.emoji}
          </div>
        ))}
      </div>

      {/* LiveKit Header Meta */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-xs font-mono font-semibold text-slate-200 flex items-center gap-1.5">
            <span>LiveKit WebRTC</span>
            <span className="text-[10px] text-indigo-400 font-normal">v1.8</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-2 py-0.5 rounded flex items-center gap-1">
            <Signal className="w-2.5 h-2.5 text-emerald-400" />
            <span>22ms • 1080p</span>
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. Interviewer Video Tile (Top) */}
      {/* ======================================================== */}
      <div className="flex-1 w-full glass-panel border border-white/10 rounded-xl p-2.5 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-slate-900/80 to-slate-950/90 shadow-md group">
        {/* Top Info Bar */}
        <div className="flex items-center justify-between text-xs font-mono z-10">
          <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-white font-medium text-[11px] truncate max-w-[140px]">
              {interviewerName}
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-400 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/5 text-[10px]">
            <span className="text-[#818CF8]">Staff Eng @ Meta</span>
          </div>
        </div>

        {/* Center: Video Simulation */}
        <div className="flex-1 flex flex-col items-center justify-center my-auto py-1 relative">
          {interviewerCam ? (
            <div className="relative flex flex-col items-center">
              {/* Outer pulsing ring for active speaker */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#5856D6] via-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg text-white shadow-[0_0_24px_rgba(88,86,214,0.6)] ring-2 ring-[#5856D6]/70">
                AC
              </div>

              {/* Dynamic Soundwave Equalizer */}
              {interviewerMic && (
                <div className="flex items-center gap-1 mt-2 bg-slate-950/80 px-2 py-0.5 rounded-full border border-white/10">
                  <span className="w-0.5 h-2.5 bg-emerald-400 rounded-full animate-audio-bar-1" />
                  <span className="w-0.5 h-4 bg-emerald-400 rounded-full animate-audio-bar-2" />
                  <span className="w-0.5 h-3 bg-emerald-400 rounded-full animate-audio-bar-3" />
                  <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-audio-bar-4" />
                  <span className="text-[10px] font-mono text-emerald-300 ml-1">Speaking</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-slate-500">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <VideoOff className="w-5 h-5 text-slate-500" />
              </div>
              <span className="text-[10px] font-mono">Camera Off</span>
            </div>
          )}
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between pt-1 border-t border-white/5 z-10">
          <span className="text-[10px] font-mono text-slate-500">Host Audio Stream</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setInterviewerMic(!interviewerMic)}
              className={`p-1.5 rounded-lg border text-xs transition-all ${
                interviewerMic
                  ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  : 'bg-red-500/20 border-red-500/40 text-red-400'
              }`}
            >
              {interviewerMic ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
            </button>
            <button
              type="button"
              onClick={() => setInterviewerCam(!interviewerCam)}
              className={`p-1.5 rounded-lg border text-xs transition-all ${
                interviewerCam
                  ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  : 'bg-red-500/20 border-red-500/40 text-red-400'
              }`}
            >
              {interviewerCam ? <Video className="w-3 h-3" /> : <VideoOff className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Candidate Video Tile (Bottom) */}
      {/* ======================================================== */}
      <div className="flex-1 w-full glass-panel border border-white/10 rounded-xl p-2.5 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-slate-900/80 to-slate-950/90 shadow-md group">
        {/* Top Info Bar */}
        <div className="flex items-center justify-between text-xs font-mono z-10">
          <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-white font-medium text-[11px] truncate max-w-[140px]">
              {intervieweeName}
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-400 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/5 text-[10px]">
            <span className="text-slate-300">Candidate (L5 Track)</span>
          </div>
        </div>

        {/* Center: Video Simulation */}
        <div className="flex-1 flex flex-col items-center justify-center my-auto py-1">
          {intervieweeCam ? (
            <div className="relative flex flex-col items-center">
              <UserAvatar
                fallback="DM"
                size="md"
                className="ring-2 ring-indigo-500 shadow-[0_0_20px_rgba(88,86,214,0.4)]"
              />
              {intervieweeMic && (
                <div className="flex items-center gap-1 mt-2 bg-slate-950/80 px-2 py-0.5 rounded-full border border-white/10">
                  <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-audio-bar-2" />
                  <span className="w-0.5 h-3 bg-emerald-400 rounded-full animate-audio-bar-3" />
                  <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-audio-bar-1" />
                  <span className="text-[10px] font-mono text-emerald-300 ml-1">Live Mic</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-slate-500">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <VideoOff className="w-5 h-5 text-slate-500" />
              </div>
              <span className="text-[10px] font-mono">Camera Paused</span>
            </div>
          )}
        </div>

        {/* Bottom controls & Quick Reactions */}
        <div className="flex items-center justify-between pt-1 border-t border-white/5 z-10">
          <div className="flex items-center gap-1">
            {emojiBar.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => addReaction(emoji, 'Candidate')}
                className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center text-xs transition-transform hover:scale-125 active:scale-95"
                title={`Send ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIntervieweeMic(!intervieweeMic)}
              className={`p-1.5 rounded-lg border text-xs transition-all ${
                intervieweeMic
                  ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  : 'bg-red-500/20 border-red-500/40 text-red-400'
              }`}
            >
              {intervieweeMic ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
            </button>
            <button
              type="button"
              onClick={() => setIntervieweeCam(!intervieweeCam)}
              className={`p-1.5 rounded-lg border text-xs transition-all ${
                intervieweeCam
                  ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  : 'bg-red-500/20 border-red-500/40 text-red-400'
              }`}
            >
              {intervieweeCam ? <Video className="w-3 h-3" /> : <VideoOff className="w-3 h-3" />}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsScreenSharing(!isScreenSharing);
                addReaction('🖥️', 'Screen Share');
              }}
              className={`p-1.5 rounded-lg border text-xs transition-all ${
                isScreenSharing
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
              }`}
              title="Toggle Screen Share"
            >
              <Monitor className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AVGrid;

