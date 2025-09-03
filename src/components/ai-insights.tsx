"use client";

import { useEffect, useState } from "react";
import { getAiGeneratedReport } from "@/app/actions";
import type { DiscScores } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Wand2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function AiInsights({ scores }: { scores: DiscScores }) {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      setLoading(true);
      const result = await getAiGeneratedReport(scores);
      setReport(result);
      setLoading(false);
    }
    fetchReport();
  }, [scores]);

  return (
    <Card className="bg-accent/20 border-accent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <Wand2 /> AI-Powered Interpretation
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{report}</p>
        )}
      </CardContent>
    </Card>
  );
}
