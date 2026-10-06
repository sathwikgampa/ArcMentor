'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  UserCheck,
  User,
  Check,
  ChevronDown,
  ArrowRight,
  Building2,
  Code2,
  CheckCircle2,
} from 'lucide-react';

const TECH_STACK_OPTIONS = [
  'React/Next.js',
  'Node.js/Backend',
  'Python/AI',
  'Java/Spring',
  'Go/Distributed Systems',
  'C++/Algorithms',
];

const SUGGESTED_COMPANIES = ['Google', 'Meta', 'Stripe', 'Amazon', 'Apple'];

export default function OnboardingPage() {
  const router = useRouter();

  // Controlled form state
  const [role, setRole] = useState<'interviewee' | 'interviewer'>('interviewee');
  const [techStack, setTechStack] = useState<string>('React/Next.js');
  const [targetCompaniesInput, setTargetCompaniesInput] = useState<string>(
    'Google, Meta, Stripe'
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Parse comma-separated tags
  const companyTags = targetCompaniesInput
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  const handleAddCompany = (company: string) => {
    if (!companyTags.includes(company)) {
      const updated = companyTags.length > 0 ? `${targetCompaniesInput}, ${company}` : company;
      setTargetCompaniesInput(updated);
    }
  };

  const handleRemoveCompany = (companyToRemove: string) => {
    const updated = companyTags
      .filter((c) => c.toLowerCase() !== companyToRemove.toLowerCase())
      .join(', ');
    setTargetCompaniesInput(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }, 800);
  };

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex-1 flex flex-col items-center justify-center p-4 sm:p-6 relative">
      {/* Ambient background glow */}
      <div className="absolute w-96 h-96 bg-[#5856D6]/20 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Main Glass Panel Card */}
      <div className="w-full max-w-xl glass-panel p-6 sm:p-10 border border-white/10 shadow-[0_0_50px_rgba(88,86,214,0.15)] relative">
        {/* Top Header & Logo */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-3 group transition-transform hover:scale-105"
          >
            <span className="text-[#5856D6] font-extrabold text-2xl">⚡</span>
            <span className="text-xl font-bold tracking-tight text-white">
              ArcMentor
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Complete Your Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-md mx-auto">
            Set your peer matching preferences to find calibrated interview partners.
          </p>

          {/* Stepper Progress Bar */}
          <div className="mt-6 flex items-center justify-between text-xs font-mono text-slate-400 max-w-md mx-auto">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <span className="w-5 h-5 rounded-full bg-[#5856D6] text-white flex items-center justify-center text-[10px] font-bold shadow-[0_0_10px_#5856D6]">
                1
              </span>
              Role
            </span>
            <span className="h-[1px] flex-1 bg-gradient-to-r from-[#5856D6] to-[#818CF8] mx-2" />
            <span className="flex items-center gap-1.5 text-white font-medium">
              <span className="w-5 h-5 rounded-full bg-[#5856D6] text-white flex items-center justify-center text-[10px] font-bold shadow-[0_0_10px_#5856D6]">
                2
              </span>
              Tech Stack
            </span>
            <span className="h-[1px] flex-1 bg-gradient-to-r from-[#818CF8] to-[#5856D6] mx-2" />
            <span className="flex items-center gap-1.5 text-white font-medium">
              <span className="w-5 h-5 rounded-full bg-[#5856D6] text-white flex items-center justify-center text-[10px] font-bold shadow-[0_0_10px_#5856D6]">
                3
              </span>
              Target Tier
            </span>
          </div>
        </div>

        {/* Onboarding Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Select your Role */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-white flex items-center gap-2">
                <span>Select your Role</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                Step 1 of 3
              </span>
            </div>

            <div
              role="radiogroup"
              aria-label="Select your Role"
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
            >
              {/* Interviewee Card */}
              <button
                type="button"
                role="radio"
                aria-checked={role === 'interviewee'}
                onClick={() => setRole('interviewee')}
                className={`relative p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  role === 'interviewee'
                    ? 'border-[#5856D6] bg-[#5856D6]/15 shadow-[0_0_20px_rgba(88,86,214,0.35)] ring-1 ring-[#5856D6]'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-slate-200">
                    <User className="w-5 h-5 text-[#818CF8]" />
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      role === 'interviewee'
                        ? 'border-[#5856D6] bg-[#5856D6] text-white'
                        : 'border-white/20'
                    }`}
                  >
                    {role === 'interviewee' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white text-sm">Interviewee</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                      -1 Credit
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Practice live rounds, receive 4D rubric ratings, and build your skill map.
                  </p>
                </div>
              </button>

              {/* Interviewer Card */}
              <button
                type="button"
                role="radio"
                aria-checked={role === 'interviewer'}
                onClick={() => setRole('interviewer')}
                className={`relative p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  role === 'interviewer'
                    ? 'border-[#5856D6] bg-[#5856D6]/15 shadow-[0_0_20px_rgba(88,86,214,0.35)] ring-1 ring-[#5856D6]'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-slate-200">
                    <UserCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      role === 'interviewer'
                        ? 'border-[#5856D6] bg-[#5856D6] text-white'
                        : 'border-white/20'
                    }`}
                  >
                    {role === 'interviewer' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white text-sm">Interviewer</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                      +1 Credit
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Conduct mock interviews, evaluate peers, and gain hiring perspectives.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Primary Tech Stack */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="tech-stack-select"
                className="text-sm font-semibold text-white flex items-center gap-2"
              >
                <Code2 className="w-4 h-4 text-[#818CF8]" />
                <span>Primary Tech Stack</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                Step 2 of 3
              </span>
            </div>

            <div className="relative">
              <select
                id="tech-stack-select"
                name="primaryTechStack"
                aria-label="Primary Tech Stack"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full appearance-none bg-slate-900/90 text-white text-sm rounded-xl px-4 py-3.5 pr-10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#5856D6] focus:border-[#5856D6] transition-all cursor-pointer shadow-inner"
              >
                {TECH_STACK_OPTIONS.map((option) => (
                  <option
                    key={option}
                    value={option}
                    className="bg-slate-900 text-white py-2"
                  >
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Quick Pick Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {TECH_STACK_OPTIONS.slice(0, 4).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTechStack(option)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    techStack === option
                      ? 'bg-[#5856D6]/30 border-[#5856D6] text-white shadow-[0_0_10px_rgba(88,86,214,0.3)]'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Target Companies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="target-companies-input"
                className="text-sm font-semibold text-white flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-[#818CF8]" />
                <span>Target Companies</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                Step 3 of 3
              </span>
            </div>

            <div className="relative">
              <input
                id="target-companies-input"
                name="targetCompanies"
                aria-label="Target Companies"
                type="text"
                value={targetCompaniesInput}
                onChange={(e) => setTargetCompaniesInput(e.target.value)}
                placeholder="Google, Meta, Stripe"
                className="w-full bg-slate-900/90 text-white text-sm rounded-xl px-4 py-3.5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#5856D6] focus:border-[#5856D6] placeholder-slate-500 transition-all shadow-inner"
              />
            </div>

            {/* Render parsed tags */}
            {companyTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-400 mr-1">Active Targets:</span>
                {companyTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#5856D6]/20 border border-[#5856D6]/40 text-[#C7D2FE]"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCompany(tag)}
                      className="hover:text-white transition-colors text-slate-400 text-xs"
                      aria-label={`Remove ${tag}`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Suggested Tags Quick Add */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-slate-400">
              <span className="text-[11px] text-slate-500">Suggestions:</span>
              {SUGGESTED_COMPANIES.map((company) => (
                <button
                  key={company}
                  type="button"
                  onClick={() => handleAddCompany(company)}
                  disabled={companyTags.includes(company)}
                  className={`text-[11px] px-2 py-0.5 rounded-md border transition-all ${
                    companyTags.includes(company)
                      ? 'opacity-40 border-white/5 cursor-default'
                      : 'border-white/10 hover:border-white/20 hover:text-white bg-white/5'
                  }`}
                >
                  +{company}
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Primary Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-[#5856D6] hover:bg-[#4E4CC4] shadow-[0_0_25px_rgba(88,86,214,0.5)] border border-[#5856D6]/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-75 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : submitted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
              <span>Complete Profile & Enter Queue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
