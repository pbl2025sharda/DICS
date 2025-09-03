"use client";

import { useEffect, useState } from "react";
import { getAiGeneratedReport } from "@/app/actions";
import type { DiscScores } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Wand2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function AiInsights({ scores }: { scores: DiscScores }) {
  return null;
}
