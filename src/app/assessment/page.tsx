"use client";

import { Suspense } from "react";
import DiscAssessmentForm from "@/components/disc-assessment-form";

function AssessmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <DiscAssessmentForm />
      </Suspense>
    </div>
  );
}

export default AssessmentPage;
