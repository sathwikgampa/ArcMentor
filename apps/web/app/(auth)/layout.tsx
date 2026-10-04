/**
 * Authentication Pages
 * Login, registration, and OAuth callback routes.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
      <div className="w-full max-w-md p-8 bg-white rounded-card shadow-elevated">
        {children}
      </div>
    </div>
  );
}
