'use client';

import React, { useState, useRef } from 'react';
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
  Database,
  Server,
  Cpu,
  Globe,
  Plus,
  Trash2,
} from 'lucide-react';

interface WhiteboardProps {
  roomId?: string;
}

interface DiagramNode {
  id: string;
  title: string;
  subtitle: string;
  iconType: 'globe' | 'gateway' | 'cache' | 'db' | 'queue';
  x: number;
  y: number;
  color: string;
}

export function Whiteboard({ roomId }: WhiteboardProps) {
  const [activeTool, setActiveTool] = useState<string>('select');
  const [selectedColor, setSelectedColor] = useState<string>('#818CF8');
  const [zoom, setZoom] = useState<number>(100);

  const initialNodes: DiagramNode[] = [
    { id: '1', title: 'CLIENT LAYER', subtitle: 'Web / Mobile (Next.js)', iconType: 'globe', x: 40, y: 160, color: '#818CF8' },
    { id: '2', title: 'API GATEWAY', subtitle: 'Reverse Proxy & Auth', iconType: 'gateway', x: 250, y: 160, color: '#5856D6' },
    { id: '3', title: 'REDIS CLUSTER', subtitle: 'Session & O(1) Cache', iconType: 'cache', x: 460, y: 80, color: '#10B981' },
    { id: '4', title: 'POSTGRESQL', subtitle: 'Primary ACID DB', iconType: 'db', x: 460, y: 240, color: '#F59E0B' },
  ];

  const [nodes, setNodes] = useState<DiagramNode[]>(initialNodes);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const colors = [
    { hex: '#818CF8', label: 'Indigo' },
    { hex: '#10B981', label: 'Emerald' },
    { hex: '#F59E0B', label: 'Amber' },
    { hex: '#06B6D4', label: 'Cyan' },
    { hex: '#F43F5E', label: 'Rose' },
  ];

  const addCustomNode = () => {
    const types: Array<{ title: string; subtitle: string; iconType: DiagramNode['iconType']; color: string }> = [
      { title: 'KAFKA QUEUE', subtitle: 'Event Streamer', iconType: 'queue', color: '#06B6D4' },
      { title: 'ELASTICSEARCH', subtitle: 'Vector Index', iconType: 'db', color: '#F43F5E' },
      { title: 'WORKER POOL', subtitle: 'Async Matcher', iconType: 'gateway', color: '#10B981' },
    ];
    const template = (types[Math.floor(Math.random() * types.length)] ?? types[0])!;
    const newNode: DiagramNode = {
      id: Math.random().toString(),
      title: template.title,
      subtitle: template.subtitle,
      iconType: template.iconType,
      x: 200 + Math.random() * 150,
      y: 100 + Math.random() * 100,
      color: template.color,
    };
    setNodes([...nodes, newNode]);
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    if (activeTool !== 'select') return;
    setDraggingId(id);
    const node = nodes.find((n) => n.id === id);
    if (node) {
      setDragOffset({
        x: e.clientX - node.x,
        y: e.clientY - node.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId) return;
    setNodes((prev) =>
      prev.map((node) => {
        if (node.id === draggingId) {
          return {
            ...node,
            x: Math.max(10, Math.min(650, e.clientX - dragOffset.x)),
            y: Math.max(10, Math.min(360, e.clientY - dragOffset.y)),
          };
        }
        return node;
      })
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  return (
    <div
      className="w-full h-full relative overflow-hidden flex flex-col bg-[#0b0f19] select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* 1. Whiteboard Top Toolbar */}
      <div className="h-11 shrink-0 px-4 border-b border-white/10 bg-slate-900/80 backdrop-blur-md flex items-center justify-between z-20">
        {/* Left: Tools */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTool('select')}
            title="Select & Move Nodes"
            className={`p-1.5 rounded-lg text-xs transition-all ${
              activeTool === 'select'
                ? 'bg-[#5856D6] text-white shadow-[0_0_12px_rgba(88,86,214,0.5)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <MousePointer className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('pencil')}
            title="Draw Freehand"
            className={`p-1.5 rounded-lg text-xs transition-all ${
              activeTool === 'pencil'
                ? 'bg-[#5856D6] text-white shadow-[0_0_12px_rgba(88,86,214,0.5)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={addCustomNode}
            title="Add Architecture Block"
            className="p-1.5 rounded-lg text-xs text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all flex items-center gap-1 font-mono"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] font-semibold">Node</span>
          </button>
        </div>

        {/* Center: Color Palette */}
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl">
          <span className="text-[10px] font-mono text-slate-400 mr-1 hidden sm:inline">Color:</span>
          {colors.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => setSelectedColor(c.hex)}
              className={`w-4 h-4 rounded-full transition-transform ${
                selectedColor === c.hex ? 'scale-125 ring-2 ring-white' : 'hover:scale-110 opacity-70'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.label}
            />
          ))}
        </div>

        {/* Right: Zoom & Reset Controls */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setZoom((prev) => Math.max(50, prev - 10))}
              className="p-1 text-slate-400 hover:text-white"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="px-1.5 text-[10px] font-mono text-slate-300">{zoom}%</span>
            <button
              type="button"
              onClick={() => setZoom((prev) => Math.min(150, prev + 10))}
              className="p-1 text-slate-400 hover:text-white"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setNodes(initialNodes)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all"
            title="Reset Diagram"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. Interactive Canvas Body */}
      <div className="flex-1 relative overflow-hidden bg-dot-grid p-6 flex flex-col justify-between">
        {/* Subtle Canvas Tag Header */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 z-10">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#818CF8]" />
            <span className="text-white font-medium">Interactive Whiteboard Studio</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 text-[11px]">Drag nodes to rearrange topology</span>
          </div>
          <span className="text-emerald-400 text-[11px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
            P2P Canvas Active
          </span>
        </div>

        {/* Node Area & SVG Connections */}
        <div className="relative w-full h-[400px] my-auto">
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-to-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#818CF8" />
              </marker>
            </defs>
            {/* Dynamic Lines between consecutive nodes */}
            {nodes.slice(0, 3).map((node, i) => {
              const nextNode = nodes[i + 1];
              if (!nextNode) return null;
              return (
                <line
                  key={`${node.id}-${nextNode.id}`}
                  x1={node.x + 80}
                  y1={node.y + 35}
                  x2={nextNode.x + 10}
                  y2={nextNode.y + 35}
                  stroke="#5856D6"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
              );
            })}
          </svg>

          {/* Draggable Architecture Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              onMouseDown={(e) => handleMouseDown(e, node.id)}
              style={{
                transform: `translate(${node.x}px, ${node.y}px) scale(${zoom / 100})`,
                borderColor: `${node.color}55`,
              }}
              className="absolute cursor-move select-none glass-panel p-3.5 rounded-xl border shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-shadow hover:shadow-[0_0_25px_rgba(88,86,214,0.4)] hover:border-white/40 group min-w-[150px] bg-slate-900/90 backdrop-blur-md"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span
                  className="text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{ color: node.color }}
                >
                  {node.title}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <p className="text-xs text-white font-medium">{node.subtitle}</p>
              <div className="mt-2 pt-1 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Node #{node.id.slice(0, 4)}</span>
                <span className="group-hover:text-slate-300">Drag to move</span>
              </div>
            </div>
          ))}
        </div>

        {/* Canvas Bottom Legend */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/10 pt-2 z-10">
          <div className="flex items-center gap-3">
            <span>Elements: <strong className="text-white">{nodes.length}</strong></span>
            <span className="text-slate-600">•</span>
            <span>Collaborator Pointers: <strong className="text-emerald-400">2 Active</strong></span>
          </div>
          <span className="text-[#818CF8]">Hold click on any node to reposition</span>
        </div>
      </div>
    </div>
  );
}

export default Whiteboard;

