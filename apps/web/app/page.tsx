import Link from 'next/link';

/**
 * ArcMentor Landing Page
 * Marketing hero with live match simulator preview.
 */
export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-hero text-white flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight max-w-4xl">
          Practice Interviews.{' '}
          <span className="text-gradient">Land Your Dream Job.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
          Get matched with peers for realistic mock interviews. Earn credits,
          receive structured feedback, and track your progress — all for free.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl shadow-btn-primary hover:-translate-y-0.5 transition-all duration-200"
          >
            Get Started →
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white/90 font-semibold rounded-xl hover:bg-white/10 transition-all duration-200"
          >
            See How It Works
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-surface">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            How It Works
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
            Three simple steps to start practicing
          </p>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Set Your Preferences',
                description:
                  'Pick your role, seniority level, and preferred language. Add your available time slots.',
              },
              {
                step: '02',
                title: 'Get Matched',
                description:
                  'Our matching engine pairs you with an ideal peer based on your profile within hours.',
              },
              {
                step: '03',
                title: 'Practice & Grow',
                description:
                  'Join live sessions, receive rubric-based feedback, and track your skill progression.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-card p-8 shadow-card border border-border hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-250"
              >
                <span className="text-5xl font-bold text-gradient">
                  {item.step}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
