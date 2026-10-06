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
  Award,
  Send,
  ThumbsUp,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { useWorkspaceStore } from '@/lib/store/workspace-store';

export function InterviewerSurface() {
  const { addReaction } = useWorkspaceStore();
  
  // Accordion state
  const [hintsOpen, setHintsOpen] = useState(true);
  const [activeHintIndex, setActiveHintIndex] = useState<number | null>(0);
  const [hintSent, setHintSent] = useState<number | null>(null);

  // 4 Core FAANG Rubric Dimensions (1 - 5)
  const [scores, setScores] = useState({
    clarification: 4,
    algorithm: 4,
    quality: 5,
    communication: 4,
  });

  const [interviewerNotes, setInterviewerNotes] = useState<string>(
    'Candidate quickly verified input boundaries and correctly selected hash map approach with O(N) time complexity.'
  );

  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Identified O(N) hash map',
    'Tested empty/negative edge cases',
  ]);

  const quickRubricTags = [
    'Identified O(N) hash map',
    'Clarified duplicate constraints',
    'Tested empty/negative edge cases',
    'Clean idiomatic naming',
    'Struggled with map lookup syntax',
    'Needed hint for space complexity',
  ];

  const hints = [
    {
      id: 1,
      title: 'Hint 1: Inverted Lookup with Hash Map',
      content:
        'Suggest candidate compute (target - current_num) and look up in a Map to reduce time complexity from O(N²) to O(N).',
    },
    {
      id: 2,
      title: 'Hint 2: Handling Duplicate Elements',
      content:
        'Remind candidate to verify if duplicate numbers (e.g. nums=[3,3], target=6) could reuse the same index.',
    },
    {
      id: 3,
      title: 'Reference Optimal Solution (L5/L6 Standard)',
      isCode: true,
      content: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    },
  ];

  // Calculate Average & Hiring Recommendation
  const averageScore = (
    (scores.clarification + scores.algorithm + scores.quality + scores.communication) /
    4
  ).toFixed(1);

  const getVerdict = (avg: number) => {
    if (avg >= 4.5) return { label: 'Strong Hire', color: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50' };
    if (avg >= 3.8) return { label: 'Hire', color: 'text-indigo-400 bg-indigo-950/80 border-indigo-500/50' };
    if (avg >= 3.0) return { label: 'Lean Hire', color: 'text-amber-400 bg-amber-950/80 border-amber-500/50' };
    return { label: 'No Hire', color: 'text-rose-400 bg-rose-950/80 border-rose-500/50' };
  };

  const verdict = getVerdict(Number(averageScore));

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSendHint = (hintId: number) => {
    setHintSent(hintId);
    addReaction('💡', 'Interviewer');
    setTimeout(() => setHintSent(null), 2500);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 sm:p-5 bg-slate-950/90 text-slate-100 space-y-4 select-none">
      {/* 1. Real-time Calibrated Score Summary Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900/90 to-slate-900/60 border border-white/10 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#818CF8]" />
              <span className="text-xs font-mono font-bold text-slate-300">
                CALIBRATED VERDICT
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">
                {averageScore}
              </span>
              <span className="text-xs text-slate-400">/ 5.0</span>
            </div>
          </div>

          <div className={`px-3 py-1 rounded-full border text-xs font-bold font-mono tracking-wide ${verdict.color}`}>
            {verdict.label}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#5856D6] to-emerald-400 transition-all duration-300 rounded-full"
            style={{ width: `${(Number(averageScore) / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* 2. 4D Rubric Sliders */}
      <div className="p-4 rounded-xl border border-white/10 bg-slate-900/60 space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#818CF8]" />
            <h4 className="text-xs sm:text-sm font-semibold text-white">
              Senior Rubric Dimensions
            </h4>
          </div>
          <span className="text-[10px] font-mono text-slate-400">FAANG Calibrated</span>
        </div>

        {/* Dimension 1: Problem Clarification */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label className="text-slate-300 font-medium">1. Clarification & Edge Cases</label>
            <span className="font-mono text-[#818CF8] font-bold">{scores.clarification}/5</span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            value={scores.clarification}
            onChange={(e) => setScores({ ...scores, clarification: Number(e.target.value) })}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#5856D6]"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>Rushed into code</span>
            <span className="text-emerald-400">Proactively scoped inputs</span>
          </div>
        </div>

        {/* Dimension 2: Algorithm & Complexity */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label className="text-slate-300 font-medium">2. Algorithm Optimization</label>
            <span className="font-mono text-[#818CF8] font-bold">{scores.algorithm}/5</span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            value={scores.algorithm}
            onChange={(e) => setScores({ ...scores, algorithm: Number(e.target.value) })}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#5856D6]"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>Brute Force O(N²)</span>
            <span className="text-emerald-400">Optimal O(N) Hash Map</span>
          </div>
        </div>

        {/* Dimension 3: Code Quality */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label className="text-slate-300 font-medium">3. Code Quality & Modularity</label>
            <span className="font-mono text-[#818CF8] font-bold">{scores.quality}/5</span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            value={scores.quality}
            onChange={(e) => setScores({ ...scores, quality: Number(e.target.value) })}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#5856D6]"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>Monolithic / Messy</span>
            <span className="text-emerald-400">Clean Production Idioms</span>
          </div>
        </div>

        {/* Dimension 4: Communication */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label className="text-slate-300 font-medium">4. Communication & Collaboration</label>
            <span className="font-mono text-[#818CF8] font-bold">{scores.communication}/5</span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            value={scores.communication}
            onChange={(e) => setScores({ ...scores, communication: Number(e.target.value) })}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#5856D6]"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>Silent Thinker</span>
            <span className="text-emerald-400">Clear Thought Process</span>
          </div>
        </div>
      </div>

      {/* 3. Quick Rubric Observation Tags */}
      <div className="p-4 rounded-xl border border-white/10 bg-slate-900/60 space-y-2.5 shadow-lg">
        <label className="text-xs font-semibold text-white block">
          Quick Evaluation Tags:
        </label>
        <div className="flex flex-wrap gap-1.5">
          {quickRubricTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                  isSelected
                    ? 'bg-[#5856D6] text-white shadow-[0_0_10px_rgba(88,86,214,0.5)]'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Hidden Hints & Solution Dispatcher */}
      <div className="rounded-xl border border-white/10 overflow-hidden bg-slate-900/60 shadow-lg">
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
                Interviewer Hints & Solution
              </h4>
              <p className="text-[11px] text-slate-400">
                Progressive candidate scaffolding
              </p>
            </div>
          </div>
          {hintsOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {hintsOpen && (
          <div className="p-3.5 space-y-2.5 border-t border-white/10 bg-slate-950/60">
            {hints.map((hint, idx) => (
              <div
                key={hint.title}
                className="rounded-lg border border-white/5 overflow-hidden bg-white/[0.02]"
              >
                <div className="px-3 py-2 flex items-center justify-between text-xs font-medium text-slate-300">
                  <button
                    type="button"
                    onClick={() => setActiveHintIndex(activeHintIndex === idx ? null : idx)}
                    className="flex items-center gap-2 hover:text-white flex-1 text-left"
                  >
                    <span className="w-4 h-4 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-mono">
                      {idx + 1}
                    </span>
                    <span className="truncate">{hint.title}</span>
                  </button>

                  {!hint.isCode && (
                    <button
                      type="button"
                      onClick={() => handleSendHint(hint.id)}
                      className={`ml-2 px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 transition-all ${
                        hintSent === hint.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#5856D6]/20 border border-[#5856D6]/40 text-[#C7D2FE] hover:bg-[#5856D6]/30'
                      }`}
                      title="Deliver hint to candidate workspace"
                    >
                      <Send className="w-2.5 h-2.5" />
                      <span>{hintSent === hint.id ? 'Sent!' : 'Send Hint'}</span>
                    </button>
                  )}
                </div>

                {activeHintIndex === idx && (
                  <div className="px-3 pb-3 pt-1 text-xs text-slate-300 border-t border-white/5 bg-slate-900/40">
                    {hint.isCode ? (
                      <pre className="p-2.5 rounded bg-black/60 font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed border border-white/5">
                        {hint.content}
                      </pre>
                    ) : (
                      <p className="leading-relaxed text-slate-300">{hint.content}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Qualitative Feedback Notes */}
      <div className="p-4 rounded-xl border border-white/10 bg-slate-900/60 space-y-2 shadow-lg">
        <label className="text-xs font-semibold text-white block">
          Interviewer Qualitative Feedback:
        </label>
        <textarea
          rows={3}
          value={interviewerNotes}
          onChange={(e) => setInterviewerNotes(e.target.value)}
          placeholder="Detailed synthesis of problem approach, edge case rigor, and hire readiness..."
          className="w-full bg-slate-950 text-slate-200 text-xs p-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#5856D6] resize-none leading-relaxed"
        />
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] font-mono text-slate-500">Auto-saved to session ledger</span>
          <button
            type="button"
            onClick={() => {
              addReaction('🏆', 'Rubric Calibrated');
            }}
            className="px-3 py-1 rounded-lg bg-[#5856D6] hover:bg-[#4E4CC4] text-white text-xs font-semibold transition-all hover:scale-105"
          >
            Lock Rubric
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewerSurface;

