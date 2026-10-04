/**
 * Authentication Pages
 * Login, registration, and OAuth callback routes.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-hero">
      {children}
    </div>
  );
}
