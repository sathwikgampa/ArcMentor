'use client';

import React, { useState } from 'react';
import Editor, { type OnChange } from '@monaco-editor/react';
import {
  Code2,
  FileCode2,
  Play,
  RotateCcw,
  Sparkles,
  Check,
  Copy,
  Settings2,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { useWorkspaceStore } from '@/lib/store/workspace-store';

export const STARTER_CODE: Record<string, string> = {
  typescript: `/**
 * Problem 01: Two Sum
 * Language: TypeScript
 * 
 * Time Complexity Goal: O(N)
 * Space Complexity Goal: O(N)
 */
function twoSum(nums: number[], target: number): number[] {
  // Store complements in a hash map: complement -> index
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    
    map.set(nums[i], i);
  }

  return [];
}

// Simulated Test Runner
console.log("Result 1:", twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log("Result 2:", twoSum([3, 2, 4], 6));       // Expected: [1, 2]
console.log("Result 3:", twoSum([3, 3], 6));          // Expected: [0, 1]
`,
  python: `"""
Problem 01: Two Sum
Language: Python 3
"""
from typing import List

def two_sum(nums: List[int], target: int) -> List[int]:
    lookup = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in lookup:
            return [lookup[complement], i]
        lookup[num] = i
        
    return []

# Test execution
print("Test 1:", two_sum([2, 7, 11, 15], 9)) # [0, 1]
print("Test 2:", two_sum([3, 2, 4], 6))       # [1, 2]
print("Test 3:", two_sum([3, 3], 6))          # [0, 1]
`,
  javascript: `/**
 * Problem 01: Two Sum
 * Language: JavaScript (ES2024)
 */
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (seen.has(diff)) {
      return [seen.get(diff), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
`,
  go: `package main

import "fmt"

func twoSum(nums []int, target int) []int {
    m := make(map[int]int)
    for i, num := range nums {
        complement := target - num
        if idx, ok := m[complement]; ok {
            return []int{idx, i}
        }
        m[num] = i
    }
    return nil
}

func main() {
    fmt.Println(twoSum([]int{2, 7, 11, 15}, 9))
}
`,
};

interface CodeEditorProps {
  value?: string;
  defaultValue?: string;
  language?: string;
  onChange?: OnChange;
  height?: string;
}

export function CodeEditor({
  value,
  defaultValue,
  language: propLanguage,
  onChange,
  height = '100%',
}: CodeEditorProps) {
  const { currentLanguage, setCurrentLanguage } = useWorkspaceStore();
  const effectiveLanguage = propLanguage || currentLanguage || 'typescript';
  
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(13);
  const [minimap, setMinimap] = useState(false);
  const [editorCode, setEditorCode] = useState(
    defaultValue || STARTER_CODE[effectiveLanguage] || STARTER_CODE.typescript
  );

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    if (STARTER_CODE[lang]) {
      setEditorCode(STARTER_CODE[lang]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(editorCode || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleReset = () => {
    if (STARTER_CODE[effectiveLanguage]) {
      setEditorCode(STARTER_CODE[effectiveLanguage]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-[#181824] border border-white/10 rounded-xl shadow-2xl">
      {/* Editor Sub-Header Toolbar */}
      <div className="h-10 shrink-0 px-3 bg-[#13131c] border-b border-white/10 flex items-center justify-between text-xs font-mono">
        {/* Left: File breadcrumbs & language badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
            <FileCode2 className="w-3.5 h-3.5 text-[#818CF8]" />
            <span className="font-semibold text-white">solution.{effectiveLanguage === 'python' ? 'py' : effectiveLanguage === 'go' ? 'go' : 'ts'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500">
            <span>workspace</span>
            <span>/</span>
            <span>src</span>
            <span>/</span>
            <span className="text-slate-400">twoSum()</span>
          </div>
        </div>

        {/* Right: Controls & Language selector */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Selector Dropdown */}
          <div className="relative flex items-center">
            <select
              value={effectiveLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="appearance-none bg-slate-900 border border-white/15 hover:border-indigo-400 text-[#C7D2FE] text-xs font-mono pl-2.5 pr-7 py-1 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#5856D6] transition-all"
            >
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python 3</option>
              <option value="go">Go 1.22</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
          </div>

          {/* Font Size Button */}
          <button
            type="button"
            onClick={() => setFontSize((prev) => (prev >= 16 ? 12 : prev + 1))}
            className="hidden sm:inline-flex items-center px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all text-[11px]"
            title="Adjust Font Size"
          >
            <span>{fontSize}px</span>
          </button>

          {/* Reset Starter Code */}
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all"
            title="Reset to Template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Copy Code */}
          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Monaco Container */}
      <div className="flex-1 min-h-0 relative bg-[#12121a]">
        <Editor
          height={height}
          theme="vs-dark"
          defaultLanguage="typescript"
          language={effectiveLanguage === 'python' ? 'python' : effectiveLanguage === 'go' ? 'go' : effectiveLanguage === 'javascript' ? 'javascript' : 'typescript'}
          value={value !== undefined ? value : editorCode}
          onChange={(val, ev) => {
            setEditorCode(val || '');
            if (onChange) onChange(val, ev);
          }}
          options={{
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            fontSize: fontSize,
            lineHeight: 22,
            minimap: { enabled: minimap },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 14, bottom: 14 },
            fontLigatures: true,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            bracketPairColorization: { enabled: true },
            guides: { bracketPairs: true, indentation: true },
          }}
          loading={
            <div className="w-full h-full flex items-center justify-center bg-slate-950 text-slate-400 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-[#5856D6] border-t-transparent animate-spin" />
                <span>Initializing Monaco Studio & Language Server...</span>
              </div>
            </div>
          }
        />
      </div>

      {/* Monaco Status Footer */}
      <div className="h-6 shrink-0 px-3 bg-[#0e0e16] border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400 select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Language Server Ready
          </span>
          <span className="text-slate-600">•</span>
          <span>UTF-8</span>
          <span className="text-slate-600">•</span>
          <span>Tab: 2 Spaces</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#818CF8]">Collaborative Sync: 100%</span>
          <span className="text-slate-600">•</span>
          <span>Ln 18, Col 24</span>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;

