import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ArcMentor — Peer-to-Peer Mock Interview Platform',
  description:
    'Get matched with peers for realistic mock interviews. Earn credits, receive structured feedback, and track your progress — all for free.',
  keywords: [
    'mock interview',
    'peer-to-peer',
    'interview practice',
    'coding interview',
    'system design',
    'behavioral interview',
    'FAANG prep',
  ],
  openGraph: {
    title: 'ArcMentor — Practice Interviews. Land Your Dream Job.',
    description:
      'A credit-driven platform connecting technical candidates for live mock interviews with structured feedback and skill analytics.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-slate-950 text-slate-50 antialiased flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
