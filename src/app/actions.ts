"use server";

import type { DiscScores } from "@/lib/types";

export async function getAiGeneratedReport(scores: DiscScores) {
  // This function is no longer used but is kept to avoid breaking imports.
  // It can be safely removed if the AiInsights component is also removed.
  return "AI Insights have been disabled.";
}
