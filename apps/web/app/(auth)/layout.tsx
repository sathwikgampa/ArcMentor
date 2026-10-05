export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-6">
      {children}
    </div>
  );
}
