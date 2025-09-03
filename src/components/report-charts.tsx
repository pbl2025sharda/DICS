"use client";

import { BarChart, CartesianGrid, XAxis, YAxis, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell, LabelList } from 'recharts';
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

export function ScoreCharts({ scores }: { scores: DiscScores }) {
  const chartData = [
    { style: 'D', score: scores.D, fill: "var(--color-D)" },
    { style: 'I', score: scores.I, fill: "var(--color-I)" },
    { style: 'S', score: scores.S, fill: "var(--color-S)" },
    { style: 'C', score: scores.C, fill: "var(--color-C)" },
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
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid vertical={false} />
              <XAxis 
                dataKey="style" 
                tickLine={false} 
                tickMargin={10} 
                axisLine={false} 
                tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
              />
              <YAxis domain={[0, 80]} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="score" radius={8}>
                 <LabelList
                    dataKey="score"
                    position="top"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                  />
                {chartData.map((entry) => (
                  <Cell key={`cell-${entry.style}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Style Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
