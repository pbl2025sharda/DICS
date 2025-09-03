import type { DiscCategory } from './types';

export const styleDetails: Record<DiscCategory, {
    title: string;
    focus: string;
    strengths: string[];
    motivators: string[];
    communication: string[];
    growth: string[];
    roles: string[];
    icon: any;
}> = {
  D: {
    title: "Dominance",
    focus: "Results, control, challenges, speed.",
    strengths: ["Decisive, confident, results-oriented.", "Thrives in competition and problem-solving.", "Quick to act, driven by achievement."],
    motivators: ["Power, authority, independence.", "Freedom from routine.", "Achieving measurable goals."],
    communication: ["Direct, brief, to the point.", "Likes action-oriented discussions.", "May interrupt or push for decisions."],
    growth: ["May be impatient or blunt.", "Can overlook details or emotions.", "May struggle with teamwork if control is shared."],
    roles: ["Leadership, management, entrepreneurship, sales, crisis handling."],
    icon: "Target"
  },
  I: {
    title: "Influence",
    focus: "People, relationships, energy, fun.",
    strengths: ["Outgoing, persuasive, optimistic.", "Inspires and motivates others.", "Creative, brings energy to a team."],
    motivators: ["Social recognition, approval, popularity.", "Opportunities to talk and share ideas.", "Working with people rather than tasks alone."],
    communication: ["Friendly, enthusiastic, animated.", "Uses stories and humor.", "May avoid conflict or tough topics."],
    growth: ["Can be disorganized or impulsive.", "May exaggerate or over-promise.", "Can lose focus on details or deadlines."],
    roles: ["Public relations, sales, marketing, teaching, event management."],
    icon: "Megaphone"
  },
  S: {
    title: "Steadiness",
    focus: "Harmony, consistency, cooperation, relationships.",
    strengths: ["Loyal, dependable, supportive.", "Patient and calm in stressful situations.", "Good listener and team player."],
    motivators: ["Security, stability, clear expectations.", "Long-term relationships and belonging.", "Helping and serving others."],
    communication: ["Warm, calm, considerate.", "Prefers one-on-one conversations.", "Listens more than speaks."],
    growth: ["May resist change or new ideas.", "Can be indecisive, avoids confrontation.", "Sometimes taken advantage of due to helpful nature."],
    roles: ["Counseling, teaching, HR, nursing, customer service, team support."],
    icon: "HeartHandshake"
  },
  C: {
    title: "Conscientiousness",
    focus: "Accuracy, standards, structure, logic.",
    strengths: ["Detail-oriented, disciplined, analytical.", "High standards, strives for excellence.", "Good at planning, research, and quality control."],
    motivators: ["Clear rules, structure, and procedures.", "Opportunities to analyze and perfect work.", "Predictability and stability."],
    communication: ["Precise, factual, formal.", "Avoids emotional or vague language.", "Likes written details and evidence."],
    growth: ["Can be overly critical or perfectionistic.", "May avoid risks or slow decisions.", "Can struggle in fast-changing environments."],
    roles: ["Accounting, law, IT, quality assurance, engineering, research."],
    icon: "ClipboardCheck"
  }
};

export const scoreInterpretations: Record<DiscCategory, { high: string, moderate: string, low: string }> = {
    D: {
        high: "Bold, decisive, competitive, loves challenges, wants control.",
        moderate: "Can take charge when needed but not always forceful.",
        low: "Avoids conflict, more cooperative, prefers others to lead."
    },
    I: {
        high: "Enthusiastic, outgoing, persuasive, loves recognition.",
        moderate: "Friendly and social, but can balance work with fun.",
        low: "Reserved, prefers facts over feelings, less expressive."
    },
    S: {
        high: "Loyal, patient, supportive, avoids conflict, good listener.",
        moderate: "Cooperative but can handle some change.",
        low: "Restless, enjoys variety, may dislike routine or slow pace."
    },
    C: {
        high: "Detail-oriented, analytical, careful, values accuracy.",
        moderate: "Balances quality with flexibility.",
        low: "More spontaneous, may dislike rules, focuses on big picture."
    }
};

export function getInterpretationForScore(score: number): { level: "High" | "Moderate" | "Low", description: string } {
    if (score >= 20) return { level: "High", description: "High" };
    if (score >= 10) return { level: "Moderate", description: "Moderate" };
    return { level: "Low", description: "Low" };
}

export const combinationInsights: Record<string, string> = {
    "D+I": "Energetic leader, persuasive, competitive, charismatic.",
    "D+C": "Results-driven, structured, perfectionistic leader.",
    "I+S": "Warm, empathetic, supportive team player.",
    "S+C": "Dependable, careful, loyal, values harmony and precision.",
};

export const quickReference = [
    {
        style: "D - Dominance",
        subtitle: "(Task + Fast-paced)",
        focus: "Results, control, challenge",
        strengths: "Decisive, driven, bold",
        growth: "Can be too direct, impatient",
        tips: "Be patient, listen more, involve others",
    },
    {
        style: "I - Influence",
        subtitle: "(People + Fast-paced)",
        focus: "People, enthusiasm, recognition",
        strengths: "Inspiring, social, persuasive",
        growth: "Can be disorganized, overlook details",
        tips: "Stay focused, follow through, use data",
    },
    {
        style: "S - Steadiness",
        subtitle: "(People + Slower-paced)",
        focus: "Harmony, support, loyalty",
        strengths: "Patient, dependable, good listener",
        growth: "May resist change, indecisive",
        tips: "Accept change, speak up, take initiative",
    },
    {
        style: "C - Conscientiousness",
        subtitle: "(Task + Slower-paced)",
        focus: "Accuracy, quality, rules",
        strengths: "Detail-oriented, analytical, precise",
        growth: "Can be perfectionist, risk-averse",
        tips: "Be flexible, avoid overthinking, take action",
    },
];

export const practicalApplications = {
    selfAwareness: {
        title: "Self-awareness",
        description: "Knowing your DISC style helps you understand your natural strengths and potential blind spots. Use this insight to leverage your strengths and be mindful of areas for growth."
    },
    teamwork: {
        title: "Teamwork",
        description: "Appreciate the diverse styles within your team. A High-D individual drives results, while a High-S ensures stability and a High-C focuses on quality. Understanding these differences fosters better collaboration and reduces conflict."
    },
    leadership: {
        title: "Leadership Adjustments",
        description: "Effective leaders adapt their style to meet the needs of their team members. Here’s how you can adjust your approach:",
        points: [
            "With High-D individuals: Be direct, focus on results, and give them autonomy.",
            "With High-I individuals: Be friendly, provide opportunities for them to share ideas, and recognize their contributions publicly.",
            "With High-S individuals: Be patient, provide clear expectations, offer reassurance, and create a stable environment.",
            "With High-C individuals: Provide details, use logic and data, and allow them time to do quality work."
        ]
    }
}
