"use server";

import { generateDetailedDiscReport } from "@/ai/flows/generate-detailed-disc-report";
import type { DiscScores } from "@/lib/types";

export async function getAiGeneratedReport(scores: DiscScores) {
  try {
    const input = {
      dScore: scores.D,
      iScore: scores.I,
      sScore: scores.S,
      cScore: scores.C,
    };
    const result = await generateDetailedDiscReport(input);
    return result.report;
  } catch (error) {
    console.error("Error generating AI report:", error);
    return "Could not generate AI-powered insights at this time. Please check your connection and try again.";
  }
}
