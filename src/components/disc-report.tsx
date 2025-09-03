"use client";

import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Award,
  ClipboardCheck,
  Download,
  HeartHandshake,
  Megaphone,
  Target,
} from "lucide-react";
import { useMemo } from "react";
import {
  styleDetails,
  getInterpretationForScore,
  scoreInterpretations,
  combinationInsights,
  practicalApplications,
  quickReference,
} from "@/lib/disc-info";
import type { DiscScores, DiscCategory, RankedStyle } from "@/lib/types";
import { ScoreCharts } from "./report-charts";
import { Logo } from "./icons";

const iconMap: Record<DiscCategory, React.ElementType> = {
    D: Target,
    I: Megaphone,
    S: HeartHandshake,
    C: ClipboardCheck,
};

export default function DiscReport() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "Participant";
  const role = searchParams.get("role") || "";
  const date = new Date().toLocaleDateString("en-GB");

  const scores: DiscScores = {
    D: parseInt(searchParams.get("d") || "0", 10),
    I: parseInt(searchParams.get("i") || "0", 10),
    S: parseInt(searchParams.get("s") || "0", 10),
    C: parseInt(searchParams.get("c") || "0", 10),
  };

  const rankedStyles: RankedStyle[] = useMemo(() => {
    return (Object.keys(scores) as DiscCategory[])
      .map((key) => {
        const score = scores[key];
        const { level } = getInterpretationForScore(score);
        return {
          style: key,
          score,
          interpretation: level,
          description: scoreInterpretations[key][level.toLowerCase() as keyof typeof scoreInterpretations[typeof key]],
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [scores]);

  const primaryStyle = rankedStyles[0];
  const secondaryStyle = rankedStyles[1];
  const supportingStyles = rankedStyles.slice(2);

  const combinationKey = [primaryStyle.style, secondaryStyle.style].sort().join("+");
  const combinationInsight = (primaryStyle.interpretation === "High" && secondaryStyle.interpretation === "High") ? combinationInsights[combinationKey as keyof typeof combinationInsights] : null;

  if (!scores.D && !scores.I && !scores.S && !scores.C) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-bold">No report data found.</h1>
        <p className="text-muted-foreground">Please complete the assessment first.</p>
        <Button onClick={() => window.location.href = '/'} className="mt-4">Go to Assessment</Button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="bg-background min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 no-print">
            <div>
                <h1 className="text-4xl font-headline font-bold">Your DISC Report</h1>
                <p className="text-muted-foreground">Generated for {name} on {date}</p>
            </div>
          <Button onClick={handlePrint}>
            <Download className="mr-2 h-4 w-4" />
            Download Report (PDF)
          </Button>
        </div>

        <div id="print-area">
          {/* Page 1: Cover */}
          <Card className="printable-card mb-8 shadow-lg page-break">
            <CardContent className="p-10 flex flex-col items-center justify-center text-center h-[90vh]">
              <Logo />
              <h1 className="text-5xl font-bold font-headline mt-6">DISC Personality Report</h1>
              <p className="text-2xl text-muted-foreground mt-4">An analysis of your behavioral style</p>
              <div className="mt-24 text-xl space-y-2">
                <p><strong>Name:</strong> {name}</p>
                {role && <p><strong>Role:</strong> {role}</p>}
                <p><strong>Date:</strong> {date}</p>
              </div>
            </CardContent>
          </Card>

          {/* Page 2: Scores & Graphs */}
          <Card className="printable-card mb-8 shadow-lg page-break">
            <CardHeader>
              <CardTitle className="text-3xl font-headline">Scores & Graphs</CardTitle>
              <CardDescription>Your DISC scores and visual representation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <ScoreSummary scores={scores} rankedStyles={rankedStyles} />
                <ScoreCharts scores={scores} />
            </CardContent>
          </Card>

          {/* Page 3: Style Analysis */}
          <Card className="printable-card mb-8 shadow-lg page-break">
            <CardHeader>
              <CardTitle className="text-3xl font-headline">Style Analysis</CardTitle>
              <CardDescription>A deep-dive into your primary, secondary, and supporting styles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <StyleCard style={primaryStyle} title="Primary Style" />
              <StyleCard style={secondaryStyle} title="Secondary Style" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Supporting Styles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {supportingStyles.map(style => <StyleCard key={style.style} style={style} isSupporting />)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Page 4: Workplace Insights */}
          <Card className="printable-card mb-8 shadow-lg page-break">
            <CardHeader>
              <CardTitle className="text-3xl font-headline">Workplace Insights</CardTitle>
              <CardDescription>Practical applications of your DISC profile in a professional context.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <InsightSection title={practicalApplications.selfAwareness.title} description={practicalApplications.selfAwareness.description} />
                <InsightSection title={practicalApplications.teamwork.title} description={practicalApplications.teamwork.description} />
                <InsightSection title={practicalApplications.leadership.title} description={practicalApplications.leadership.description} points={practicalApplications.leadership.points} />
            </CardContent>
          </Card>

          {/* Page 5: Summary & Combination */}
          <Card className="printable-card mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-headline">Quick Reference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {combinationInsight && (
                <Card className="bg-primary/10 border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Award /> Combination Insight: High {primaryStyle.style} + High {secondaryStyle.style}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">{combinationInsight}</p>
                  </CardContent>
                </Card>
              )}
              <Card>
                  <CardHeader>
                      <CardTitle>Quick Reference Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {quickReference.map(item => <TableHead key={item.style}>{item.style}<br/><span className="font-normal text-xs">{item.subtitle}</span></TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow><TableCell className="font-semibold">Focus</TableCell>{quickReference.map(item => <TableCell key={item.style}>{item.focus}</TableCell>)}</TableRow>
                            <TableRow><TableCell className="font-semibold">Strengths</TableCell>{quickReference.map(item => <TableCell key={item.style}>{item.strengths}</TableCell>)}</TableRow>
                            <TableRow><TableCell className="font-semibold">Growth</TableCell>{quickReference.map(item => <TableCell key={item.style}>{item.growth}</TableCell>)}</TableRow>
                            <TableRow><TableCell className="font-semibold">Tips</TableCell>{quickReference.map(item => <TableCell key={item.style}>{item.tips}</TableCell>)}</TableRow>
                        </TableBody>
                    </Table>
                  </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

const ScoreSummary = ({ scores, rankedStyles }: { scores: DiscScores; rankedStyles: RankedStyle[] }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {(Object.keys(scores) as DiscCategory[]).map(key => {
            const Icon = iconMap[key];
            return (
                <Card key={key} className="p-4">
                    <Icon className="w-10 h-10 mx-auto text-primary mb-2" />
                    <p className="text-4xl font-bold">{scores[key]}</p>
                    <p className="text-lg font-semibold text-muted-foreground">{styleDetails[key].title}</p>
                </Card>
            )
        })}
    </div>
);


const StyleCard = ({ style, title, isSupporting = false }: { style: RankedStyle; title?: string; isSupporting?: boolean }) => {
    const Icon = iconMap[style.style];
    const details = styleDetails[style.style];
    return (
      <Card className={isSupporting ? "bg-muted/50" : ""}>
        <CardHeader>
          {title && <CardTitle className="text-2xl font-headline">{title}</CardTitle>}
          <CardDescription className="flex items-center gap-2 text-lg !mt-2">
            <Icon className="w-6 h-6 text-accent" /> 
            Your <span className={`font-semibold ${style.interpretation === 'High' ? 'text-primary' : style.interpretation === 'Low' ? 'text-amber-600' : ''}`}>{style.interpretation} {style.style}</span> Style ({details.title})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{style.description}</p>
          <div className="space-y-3 text-sm">
            <p><strong>Focus:</strong> {details.focus}</p>
            <p><strong>Strengths:</strong> {details.strengths.join(' ')}</p>
            <p><strong>Growth Areas:</strong> {details.growth.join(' ')}</p>
          </div>
        </CardContent>
      </Card>
    )
};

const InsightSection = ({ title, description, points }: { title: string, description: string, points?: string[] }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{description}</p>
            {points && (
                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                    {points.map((point, index) => <li key={index}>{point}</li>)}
                </ul>
            )}
        </CardContent>
    </Card>
)
