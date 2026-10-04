/**
 * Navbar Component
 * Top navigation bar with logo, nav links, credit balance, and user avatar.
 */
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-16 px-6 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold text-gradient">
          ArcMentor
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/schedule" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Schedule
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* TODO: Credit balance badge, notification bell, user avatar dropdown */}
        <Link
          href="/auth/login"
          className="px-5 py-2 bg-gradient-primary text-white text-sm font-semibold rounded-xl shadow-btn-primary hover:-translate-y-0.5 transition-all duration-200"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
