"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DiscScores } from "@/lib/types";

const colorMapping: Record<"D" | "I" | "S" | "C", string> = {
    D: "bg-blue-500",
    I: "bg-green-500",
    S: "bg-yellow-500",
    C: "bg-red-500",
};

const radarColorMapping: Record<"D" | "I" | "S" | "C", string> = {
    D: "hsl(var(--chart-1))",
    I: "hsl(var(--chart-2))",
    S: "hsl(var(--chart-3))",
    C: "hsl(var(--chart-4))",
};


export function ScoreCharts({ scores }: { scores: DiscScores }) {
    const chartData = [
        { style: 'D', name: "Dominance", score: scores.D, color: colorMapping.D },
        { style: 'I', name: "Influence", score: scores.I, color: colorMapping.I },
        { style: 'S', name: "Steadiness", score: scores.S, color: colorMapping.S },
        { style: 'C', name: "Conscientiousness", score: scores.C, color: colorMapping.C },
    ];
    
    const maxScore = 80;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[250px] flex justify-around items-end gap-4 p-4 border rounded-lg bg-background">
            {chartData.map(item => (
                <div key={item.style} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div className="text-sm font-bold">{item.score}</div>
                    <div 
                        className={`w-full rounded-t-md ${item.color}`}
                        style={{ height: `${(item.score / maxScore) * 100}%` }}
                        aria-label={`${item.name} score: ${item.score}`}
                    ></div>
                    <div className="text-sm font-semibold">{item.style}</div>
                </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Style Balance</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[250px] p-6 bg-background">
            <RadarChart scores={scores} />
        </CardContent>
      </Card>
    </div>
  );
}


function RadarChart({ scores }: { scores: DiscScores }) {
  const maxScore = 80;
  const size = 200;
  const center = size / 2;
  const numLevels = 4;
  const levelGap = center / (numLevels + 1);

  const calculatePoint = (angle: number, value: number) => {
    const radius = (value / maxScore) * (center - levelGap);
    const x = center + radius * Math.cos(angle - Math.PI / 2);
    const y = center + radius * Math.sin(angle - Math.PI / 2);
    return { x, y };
  };

  const angles = {
    D: 0,
    I: Math.PI / 2,
    S: Math.PI,
    C: (3 * Math.PI) / 2,
  };

  const points = (Object.keys(scores) as Array<keyof typeof scores>).map(key =>
    calculatePoint(angles[key], scores[key])
  );

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');
  const labels = [
    { key: "D", x: center, y: levelGap / 2 },
    { key: "I", x: size - levelGap / 2, y: center },
    { key: "S", x: center, y: size - levelGap / 2 },
    { key: "C", x: levelGap / 2, y: center },
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid Lines */}
      {Array.from({ length: numLevels }, (_, i) => (
        <circle
          key={i}
          cx={center}
          cy={center}
          r={(i + 1) * levelGap}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />
      ))}
      <line x1={center} y1={0} x2={center} y2={size} stroke="hsl(var(--border))" />
      <line x1={0} y1={center} x2={size} y2={center} stroke="hsl(var(--border))" />

      {/* Data Polygon */}
      <polygon
        points={polygonPoints}
        fill={radarColorMapping.I}
        fillOpacity="0.6"
        stroke={radarColorMapping.I}
        strokeWidth="2"
      />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={radarColorMapping.I} />
      ))}
      
      {/* Labels */}
      {labels.map(label => (
          <text key={label.key} x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">
              {label.key}
          </text>
      ))}
    </svg>
  );
}
