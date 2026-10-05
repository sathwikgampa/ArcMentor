'use client';

import React, { useState } from 'react';
import {
  Square,
  Circle,
  ArrowRight,
  Type,
  Pencil,
  Eraser,
  MousePointer,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Layers,
} from 'lucide-react';

interface WhiteboardProps {
  roomId?: string;
}

export function Whiteboard({ roomId }: WhiteboardProps) {
  const [activeTool, setActiveTool] = useState<string>('select');
  const [zoom, setZoom] = useState<number>(100);

  const tools = [
    { id: 'select', icon: MousePointer, label: 'Selection' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'ellipse', icon: Circle, label: 'Circle' },
    { id: 'arrow', icon: ArrowRight, label: 'Arrow' },
    { id: 'pencil', icon: Pencil, label: 'Freehand Draw' },
    { id: 'text', icon: Type, label: 'Text Box' },
    { id: 'eraser', icon: Eraser, label: 'Eraser' },
  ];

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col bg-[#0b101b]">
      {/* Excalidraw Canvas Toolbar */}
      <div className="h-12 shrink-0 px-4 border-b border-white/10 bg-slate-900/80 backdrop-blur-md flex items-center justify-between z-10">
        {/* Left: Tools List */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isSelected = activeTool === tool.id;

            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTool(tool.id)}
                title={tool.label}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  isSelected
                    ? 'bg-[#5856D6] text-white shadow-[0_0_12px_rgba(88,86,214,0.5)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        {/* Center: Engine Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>@excalidraw/excalidraw Runtime Placeholder</span>
        </div>

        {/* Right: Zoom & Reset Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setZoom((prev) => Math.max(50, prev - 10))}
              className="p-1 text-slate-400 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono text-slate-300">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((prev) => Math.min(200, prev + 10))}
              className="p-1 text-slate-400 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setZoom(100)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white"
            title="Reset Canvas"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Area Styled with .glass-panel Elements */}
      <div className="flex-1 relative overflow-hidden bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center p-8 select-none">
        {/* Background Canvas Board using .glass-panel */}
        <div className="w-full max-w-4xl h-[420px] glass-panel border border-white/15 p-6 relative flex flex-col justify-between shadow-[0_0_50px_rgba(88,86,214,0.15)]">
          {/* Canvas Tag */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#818CF8]" />
              <span className="text-white font-medium">Architecture Design Canvas</span>
            </div>
            <span className="text-[11px] text-slate-400">Collaborative Sync: 0ms latency</span>
          </div>

          {/* Interactive Mock Diagram Nodes */}
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 my-auto">
            {/* Node 1: Client Layer */}
            <div className="p-4 rounded-xl glass-panel border border-indigo-500/30 text-center min-w-[130px] hover:border-indigo-400 transition-colors">
              <span className="text-[11px] font-mono font-bold text-indigo-300 block mb-1">
                CLIENT LAYER
              </span>
              <p className="text-xs text-white">Browser & Mobile</p>
            </div>

            <div className="flex items-center text-slate-500">
              <span className="text-xs font-mono">──▶</span>
            </div>

            {/* Node 2: API Gateway */}
            <div className="p-4 rounded-xl glass-panel border border-[#5856D6]/50 shadow-[0_0_20px_rgba(88,86,214,0.3)] text-center min-w-[150px] hover:scale-105 transition-transform">
              <span className="text-[11px] font-mono font-bold text-[#818CF8] block mb-1">
                API GATEWAY
              </span>
              <p className="text-xs text-white">FastAPI Proxy</p>
            </div>

            <div className="flex items-center text-slate-500">
              <span className="text-xs font-mono">──▶</span>
            </div>

            {/* Node 3: Cache Layer */}
            <div className="p-4 rounded-xl glass-panel border border-emerald-500/30 text-center min-w-[130px] hover:border-emerald-400 transition-colors">
              <span className="text-[11px] font-mono font-bold text-emerald-400 block mb-1">
                REDIS CACHE
              </span>
              <p className="text-xs text-white">Key-Value Store</p>
            </div>

            <div className="flex items-center text-slate-500">
              <span className="text-xs font-mono">──▶</span>
            </div>

            {/* Node 4: Database Layer */}
            <div className="p-4 rounded-xl glass-panel border border-amber-500/30 text-center min-w-[130px] hover:border-amber-400 transition-colors">
              <span className="text-[11px] font-mono font-bold text-amber-400 block mb-1">
                POSTGRESQL
              </span>
              <p className="text-xs text-white">ACID Ledger</p>
            </div>
          </div>

          {/* Canvas Footer Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/10 pt-3">
            <span>Ready for dynamic `@excalidraw/excalidraw` embedding</span>
            <span className="text-[#818CF8]">P2P Whiteboard Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Whiteboard;
