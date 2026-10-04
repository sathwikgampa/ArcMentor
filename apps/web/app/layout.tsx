import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-surface text-text-primary">
        {children}
      </body>
    </html>
  );
}
