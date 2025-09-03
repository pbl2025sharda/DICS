
"use client";

import { BarChart, CartesianGrid, XAxis, YAxis, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LabelList, Rectangle } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { DiscScores } from "@/lib/types";

const chartConfig = {
  score: {
    label: "Score",
  },
  D: {
    label: "Dominance",
    color: "hsl(12 76% 61%)",
  },
  I: {
    label: "Influence",
    color: "hsl(173 58% 39%)",
  },
  S: {
    label: "Steadiness",
    color: "hsl(197 37% 24%)",
  },
  C: {
    label: "Conscientiousness",
    color: "hsl(43 74% 66%)",
  },
} satisfies ChartConfig;

const colorMapping: Record<keyof DiscScores, string> = {
    D: chartConfig.D.color,
    I: chartConfig.I.color,
    S: chartConfig.S.color,
    C: chartConfig.C.color,
};

const CustomBar = (props: any) => {
    const { x, y, width, height, payload } = props;
    const fillColor = colorMapping[payload.style as keyof DiscScores];
    // We only pass the props that Rectangle needs, excluding the problematic `style` prop
    return <Rectangle x={x} y={y} width={width} height={height} fill={fillColor} />;
};


export function ScoreCharts({ scores }: { scores: DiscScores }) {
  const chartData = [
    { style: 'D', score: scores.D, name: "Dominance" },
    { style: 'I', score: scores.I, name: "Influence" },
    { style: 'S', score: scores.S, name: "Steadiness" },
    { style: 'C', score: scores.C, name: "Conscientiousness" },
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
              <Bar dataKey="score" shape={<CustomBar/>}>
                 <LabelList
                    dataKey="score"
                    position="top"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                  />
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
