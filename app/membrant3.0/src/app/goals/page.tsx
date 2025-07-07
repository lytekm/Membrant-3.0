"use client";

import { GoalsProvider } from "@/features/Goals/GoalsContext";
import { GoalsOverview } from "@/features/Goals/GoalsOverview";

export default function GoalsPage() {
    return (
        <GoalsProvider>
            <GoalsOverview />
        </GoalsProvider>
    );
}