'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleOAuthLogin = (provider: 'github' | 'google') => {
    setLoadingProvider(provider);
    setTimeout(() => {
      setLoadingProvider(null);
    }, 1500);
  };

  return (
    <div className="w-full flex-1 min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-4 sm:p-6 relative">
      {/* Ambient background glow */}
      <div className="absolute w-72 h-72 bg-[#5856D6]/20 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Login Card */}
      <div className="w-full max-w-md glass-panel p-8 sm:p-10 border border-white/10 shadow-[0_0_50px_rgba(88,86,214,0.15)] relative text-center">
        {/* ArcMentor Logo (⚡ text) */}
        <div className="flex justify-center mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 group transition-transform hover:scale-105"
          >
            <span className="text-[#5856D6] font-extrabold text-3xl">⚡</span>
            <span className="text-2xl font-bold tracking-tight text-white">
              ArcMentor
            </span>
          </Link>
        </div>

        {/* Title and Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Sign in to your account
        </p>

        {/* Mock OAuth Buttons */}
        <div className="mt-8 space-y-3.5">
          {/* GitHub OAuth Button */}
          <button
            type="button"
            onClick={() => handleOAuthLogin('github')}
            disabled={loadingProvider !== null}
            className="w-full h-11 px-4 py-2.5 rounded-xl font-medium text-sm text-slate-100 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.08)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingProvider === 'github' ? (
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <GithubIcon />
            )}
            <span>Continue with GitHub</span>
          </button>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={() => handleOAuthLogin('google')}
            disabled={loadingProvider !== null}
            className="w-full h-11 px-4 py-2.5 rounded-xl font-medium text-sm text-slate-100 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.08)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingProvider === 'google' ? (
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Bottom Link */}
        <p className="text-center text-xs text-slate-400 mt-8">
          Don't have an account?{' '}
          <Link
            href="/register"
            className="text-[#818CF8] hover:text-white font-medium transition-colors hover:underline ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
