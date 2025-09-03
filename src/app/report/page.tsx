"use client"

import { Suspense } from 'react';
import DiscReport from '@/components/disc-report';

export default function ReportPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Generating Report...</div>}>
            <DiscReport />
        </Suspense>
    );
}
