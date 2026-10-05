'use client';

import React from 'react';
import Editor, { type OnChange } from '@monaco-editor/react';

interface CodeEditorProps {
  value?: string;
  defaultValue?: string;
  language?: string;
  onChange?: OnChange;
  height?: string;
}

const defaultCode = `// ArcMentor Live Collaborative IDE
// Language: JavaScript / TypeScript

function solution() {
  console.log("Hello from ArcMentor!");
}

solution();
`;

export function CodeEditor({
  value,
  defaultValue = defaultCode,
  language = 'javascript',
  onChange,
  height = '100%',
}: CodeEditorProps) {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#1e1e1e]">
      <Editor
        height={height}
        theme="vs-dark"
        defaultLanguage="javascript"
        language={language}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        options={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 13,
          lineHeight: 20,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 12, bottom: 12 },
          fontLigatures: true,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          lineNumbers: 'on',
        }}
        loading={
          <div className="w-full h-full flex items-center justify-center bg-slate-950 text-slate-400 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#5856D6] border-t-transparent animate-spin" />
              <span>Loading Monaco Editor (JetBrains Mono)...</span>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default CodeEditor;
