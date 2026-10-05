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
  MoreVertical,
} from 'lucide-react';
import { UserAvatar } from '@/components/shared/user-avatar';

interface AVGridProps {
  interviewerName?: string;
  intervieweeName?: string;
}

export function AVGrid({
  interviewerName = 'Alex Chen (Interviewer)',
  intervieweeName = 'You (Interviewee)',
}: AVGridProps) {
  // Interviewer state
  const [interviewerMic, setInterviewerMic] = useState<boolean>(true);
  const [interviewerCam, setInterviewerCam] = useState<boolean>(true);

  // Interviewee state
  const [intervieweeMic, setIntervieweeMic] = useState<boolean>(true);
  const [intervieweeCam, setIntervieweeCam] = useState<boolean>(true);

  return (
    <div className="w-full h-full flex flex-col gap-3.5 p-3 sm:p-4 select-none">
      {/* LiveKit Header Meta */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold text-slate-300">
            LiveKit P2P Video Mesh
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-2 py-0.5 rounded">
          720p HD • 120ms
        </span>
      </div>

      {/* ======================================================== */}
      {/* 1. Interviewer Video Tile (Stacked Top) */}
      {/* ======================================================== */}
      <div className="flex-1 w-full glass-panel border border-white/10 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden bg-slate-900/60 shadow-inner group">
        {/* Top Info Bar */}
        <div className="flex items-center justify-between text-xs font-mono z-10">
          <div className="flex items-center gap-2 bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white font-medium text-xs truncate max-w-[150px]">
              {interviewerName}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 bg-slate-950/70 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/5">
            <Signal className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px]">Staff @ Google</span>
          </div>
        </div>

        {/* Center: Video / Avatar Feed Simulation */}
        <div className="flex-1 flex flex-col items-center justify-center my-auto py-2">
          {interviewerCam ? (
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#5856D6] to-indigo-400 flex items-center justify-center font-bold text-xl text-white shadow-[0_0_20px_rgba(88,86,214,0.5)] ring-2 ring-[#5856D6]/60">
                AC
              </div>
              {/* Speaking indicator wave */}
              {interviewerMic && (
                <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full border-2 border-slate-950 shadow-[0_0_8px_#10B981]">
                  <Volume2 className="w-3 h-3 text-white" />
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-slate-500">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <VideoOff className="w-6 h-6 text-slate-500" />
              </div>
              <span className="text-[11px] font-mono">Camera Paused</span>
            </div>
          )}
        </div>

        {/* Bottom: Mute/Camera Toggle Bar for Interviewer */}
        <div className="flex items-center justify-center gap-2 pt-2 border-t border-white/5 z-10">
          <button
            type="button"
            onClick={() => setInterviewerMic(!interviewerMic)}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
              interviewerMic
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                : 'bg-red-500/20 border-red-500/40 text-red-400'
            }`}
            title={interviewerMic ? 'Mute Interviewer' : 'Unmute Interviewer'}
          >
            {interviewerMic ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => setInterviewerCam(!interviewerCam)}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
              interviewerCam
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                : 'bg-red-500/20 border-red-500/40 text-red-400'
            }`}
            title={interviewerCam ? 'Turn off camera' : 'Turn on camera'}
          >
            {interviewerCam ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Interviewee Video Tile (Stacked Bottom) */}
      {/* ======================================================== */}
      <div className="flex-1 w-full glass-panel border border-white/10 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden bg-slate-900/60 shadow-inner group">
        {/* Top Info Bar */}
        <div className="flex items-center justify-between text-xs font-mono z-10">
          <div className="flex items-center gap-2 bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white font-medium text-xs truncate max-w-[150px]">
              {intervieweeName}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 bg-slate-950/70 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/5">
            <Signal className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px]">Candidate (You)</span>
          </div>
        </div>

        {/* Center: Video / Avatar Feed Simulation */}
        <div className="flex-1 flex flex-col items-center justify-center my-auto py-2">
          {intervieweeCam ? (
            <div className="relative">
              <UserAvatar
                fallback="DM"
                size="lg"
                className="ring-2 ring-[#5856D6] shadow-[0_0_20px_rgba(88,86,214,0.4)]"
              />
              {/* Speaking indicator wave */}
              {intervieweeMic && (
                <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full border-2 border-slate-950 shadow-[0_0_8px_#10B981]">
                  <Volume2 className="w-3 h-3 text-white" />
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-slate-500">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <VideoOff className="w-6 h-6 text-slate-500" />
              </div>
              <span className="text-[11px] font-mono">Camera Paused</span>
            </div>
          )}
        </div>

        {/* Bottom: Mute/Camera Toggle Bar for Interviewee */}
        <div className="flex items-center justify-center gap-2 pt-2 border-t border-white/5 z-10">
          <button
            type="button"
            onClick={() => setIntervieweeMic(!intervieweeMic)}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
              intervieweeMic
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                : 'bg-red-500/20 border-red-500/40 text-red-400'
            }`}
            title={intervieweeMic ? 'Mute Microphone' : 'Unmute Microphone'}
          >
            {intervieweeMic ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => setIntervieweeCam(!intervieweeCam)}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
              intervieweeCam
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                : 'bg-red-500/20 border-red-500/40 text-red-400'
            }`}
            title={intervieweeCam ? 'Turn off camera' : 'Turn on camera'}
          >
            {intervieweeCam ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all"
            title="Screen share"
          >
            <Monitor className="w-3.5 h-3.5 text-[#818CF8]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AVGrid;
