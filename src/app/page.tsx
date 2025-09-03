"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons";

export default function Home() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleStart = () => {
    const query = new URLSearchParams({ name, role }).toString();
    router.push(`/assessment?${query}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="text-3xl font-headline">DISC Insights Analyzer</CardTitle>
          <CardDescription className="text-lg">Welcome to your Personal Assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2 text-muted-foreground">
            <h3 className="text-lg font-semibold text-foreground">What is DISC?</h3>
            <p>DISC is a personal assessment tool used to improve teamwork, communication, and productivity. It measures four key behavioral traits:</p>
            <ul className="list-disc list-inside pl-4">
              <li><strong>Dominance (D):</strong> How you approach problems and challenges.</li>
              <li><strong>Influence (I):</strong> How you interact with and persuade others.</li>
              <li><strong>Steadiness (S):</strong> How you respond to pace and consistency.</li>
              <li><strong>Conscientiousness (C):</strong> How you approach rules and procedures.</li>
            </ul>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <h3 className="text-lg font-semibold text-foreground">Instructions</h3>
            <ul className="list-decimal list-inside pl-4 space-y-1">
              <li>The assessment consists of 24 questions, each with four statements.</li>
              <li>For each question, rank the statements from <strong>4 (Most like me)</strong> to <strong>1 (Least like me)</strong>.</li>
              <li>You must use each number (4, 3, 2, 1) exactly once per question.</li>
              <li>Be honest and answer based on your natural tendencies. There are no right or wrong answers.</li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Your Role (Optional)</Label>
              <Input id="role" placeholder="e.g., Manager, Team Lead" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full font-bold text-lg" onClick={handleStart} disabled={!name}>
            Start Assessment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
