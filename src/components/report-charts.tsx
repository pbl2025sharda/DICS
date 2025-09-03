
"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { DiscScores } from "@/lib/types";

const chartConfig = {
  score: {
    label: "Score",
  },
  D: {
    label: "Dominance",
    color: "hsl(var(--chart-1))",
  },
  I: {
    label: "Influence",
    color: "hsl(var(--chart-2))",
  },
  S: {
    label: "Steadiness",
    color: "hsl(var(--chart-3))",
  },
  C: {
    label: "Conscientiousness",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const colorMapping = {
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

  const radarData = [
    { subject: 'Dominance', score: scores.D, fullMark: 80 },
    { subject: 'Influence', score: scores.I, fullMark: 80 },
    { subject: 'Steadiness', score: scores.S, fullMark: 80 },
    { subject: 'Conscientiousness', score: scores.C, fullMark: 80 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="w-full h-[250px] flex justify-around items-end gap-4 p-4 border rounded-lg bg-background/50">
             {chartData.map((entry) => (
                <div key={entry.style} className="flex flex-col items-center flex-1 gap-2">
                    <div
                        className="w-full rounded-t-md relative"
                        style={{ height: '100%'}}
                    >
                      <div className="absolute bottom-0 w-full rounded-t-md" style={{ height: `${(entry.score / 80) * 100}%`, backgroundColor: entry.color }}></div>
                    </div>
                    <div className="text-sm font-bold">{entry.score}</div>
                    <div className="text-xs text-muted-foreground font-semibold">{entry.style}</div>
                </div>
             ))}
           </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Style Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 80]} />
              <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
               <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

