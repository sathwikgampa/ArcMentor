'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

interface SkillDataPoint {
  skill: string;
  score: number;
  fullMark: number;
}

const mockSkillData: SkillDataPoint[] = [
  { skill: 'Algorithms', score: 88, fullMark: 100 },
  { skill: 'System Design', score: 78, fullMark: 100 },
  { skill: 'Communication', score: 92, fullMark: 100 },
  { skill: 'Code Quality', score: 85, fullMark: 100 },
  { skill: 'Debugging', score: 90, fullMark: 100 },
];

export function SkillRadarChart() {
  const averageScore = (
    mockSkillData.reduce((acc, curr) => acc + curr.score, 0) /
    mockSkillData.length
  ).toFixed(1);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Metric Summary */}
      <div className="w-full flex items-center justify-between mb-2 px-2">
        <span className="text-xs font-mono text-slate-400">
          Composite Calibration
        </span>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#5856D6]/20 border border-[#5856D6]/40 text-[#C7D2FE]">
          {averageScore} / 100 Avg
        </span>
      </div>

      {/* Radar Chart Container */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={mockSkillData}>
            <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }}
            />
            <Radar
              name="Proficiency"
              dataKey="score"
              stroke="#5856D6"
              strokeWidth={2}
              fill="#5856D6"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Dimension Chips */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10">
        {mockSkillData.map((item) => (
          <div
            key={item.skill}
            className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 text-xs"
          >
            <span className="text-slate-400 truncate mr-2">{item.skill}</span>
            <span className="font-mono font-semibold text-white">
              {item.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillRadarChart;
