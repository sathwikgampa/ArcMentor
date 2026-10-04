/**
 * Live Workspace Page
 * Dual-view interview room with Monaco editor, LiveKit video, whiteboard, and rubric panel.
 */
export default function WorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="h-screen flex flex-col bg-surface-dark text-white">
      <header className="h-14 px-6 flex items-center justify-between border-b border-border-dark">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Live Session</span>
          {/* TODO: Session phase indicator, timer */}
        </div>
        <button className="px-4 py-2 bg-error text-white rounded-lg text-sm font-medium hover:bg-error/90 transition-colors">
          End Session
        </button>
      </header>
      <main className="flex-1 flex">
        {/* TODO: Monaco editor panel, problem/prompt panel, whiteboard, video grid */}
        <div className="flex-1 flex items-center justify-center text-text-muted">
          Workspace loading...
        </div>
      </main>
      <footer className="h-14 px-6 flex items-center gap-6 border-t border-border-dark">
        {/* TODO: Mic, camera, chat, participants controls */}
      </footer>
    </div>
  );
}
