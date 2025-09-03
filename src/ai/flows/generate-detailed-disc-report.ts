'use server';
/**
 * @fileOverview Generates a detailed DISC report based on user assessment scores.
 *
 * - generateDetailedDiscReport - A function that generates the DISC report.
 * - GenerateDetailedDiscReportInput - The input type for the generateDetailedDiscReport function.
 * - GenerateDetailedDiscReportOutput - The return type for the generateDetailedDiscReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDetailedDiscReportInputSchema = z.object({
  dScore: z.number().describe('The Dominance score.'),
  iScore: z.number().describe('The Influence score.'),
  sScore: z.number().describe('The Steadiness score.'),
  cScore: z.number().describe('The Conscientiousness score.'),
});
export type GenerateDetailedDiscReportInput = z.infer<typeof GenerateDetailedDiscReportInputSchema>;

const GenerateDetailedDiscReportOutputSchema = z.object({
  report: z.string().describe('The detailed DISC report.'),
});
export type GenerateDetailedDiscReportOutput = z.infer<typeof GenerateDetailedDiscReportOutputSchema>;

export async function generateDetailedDiscReport(input: GenerateDetailedDiscReportInput): Promise<GenerateDetailedDiscReportOutput> {
  return generateDetailedDiscReportFlow(input);
}

const combinationInsightsTool = ai.defineTool(
    {
        name: 'getDiscCombinationInsights',
        description: 'This tool provides insights based on combinations of DISC styles, for example, High D + High I, High I + High S, etc.',
        inputSchema: z.object({
            primaryStyle: z.string().describe('The primary DISC style (D, I, S, or C).'),
            secondaryStyle: z.string().describe('The secondary DISC style (D, I, S, or C).'),
        }),
        outputSchema: z.string(),
    },
    async (input) => {
        const {primaryStyle, secondaryStyle} = input;

        if (primaryStyle === 'D' && secondaryStyle === 'I') {
            return 'Energetic leader, persuasive, competitive, charismatic.';
        } else if (primaryStyle === 'D' && secondaryStyle === 'C') {
            return 'Results-driven, structured, perfectionistic leader.';
        } else if (primaryStyle === 'I' && secondaryStyle === 'S') {
            return 'Warm, empathetic, supportive team player.';
        } else if (primaryStyle === 'S' && secondaryStyle === 'C') {
            return 'Dependable, careful, loyal, values harmony and precision.';
        } else {
            return 'No specific combination insight available for this pairing.';
        }
    }
);

const prompt = ai.definePrompt({
  name: 'generateDetailedDiscReportPrompt',
  tools: [combinationInsightsTool],
  input: {schema: GenerateDetailedDiscReportInputSchema},
  output: {schema: GenerateDetailedDiscReportOutputSchema},
  prompt: `You are an expert in DISC personality assessments. Generate a detailed DISC report based on the provided scores.

  The report should include:
  - Final Totals: D, I, S, C raw scores.
  - Ranked Styles: Sort from highest to lowest.
  - Primary Style: The highest score (natural personality).
  - Secondary Style: The next highest (flexible style).
  - Supporting Styles: Remaining two, with notes on challenges.
  - Interpretation: Use the thresholds (High = 20-30, Moderate = 10-19, Low = 0-9).
  - Combination Insights: If two styles are high, show combination meaning using the getDiscCombinationInsights tool.
  - Practical Application Section:
    - Self-awareness (strengths & blind spots).
    - Teamwork tips.
    - Leadership adjustments.

  Use the following scores:
  D = {{{dScore}}}
  I = {{{iScore}}}
  S = {{{sScore}}}
  C = {{{cScore}}}

  Here is the quick reference chart:
D – Dominance
(Task + Fast-paced)	I – Influence
(People + Fast-paced)	S – Steadiness
(People + Slower-paced)	C – Conscientiousness
(Task + Slower-paced)
Focus: Results, control, challenge	Focus: People, enthusiasm, recognition	Focus: Harmony, support, loyalty	Focus: Accuracy, quality, rules
Strengths: Decisive, driven, bold	Strengths: Inspiring, social, persuasive	Strengths: Patient, dependable, good listener	Strengths: Detail-oriented, analytical, precise
Growth: Can be too direct, impatient	Growth: Can be disorganized, overlook details	Growth: May resist change, indecisive	Growth: Can be perfectionist, risk-averse
Tips: Be patient, listen more, involve others	Tips: Stay focused, follow through, use data	Tips: Accept change, speak up, take initiative	Tips: Be flexible, avoid overthinking, take action

Here are the detailed descriptions:
D – Dominance
Focus: Results, control, challenges, speed.
Strengths:
Decisive, confident, results-oriented.
Thrives in competition and problem-solving.
Quick to act, driven by achievement.
Motivators:
Power, authority, independence.
Freedom from routine.
Achieving measurable goals.
Communication Style:
Direct, brief, to the point.
Likes action-oriented discussions.
May interrupt or push for decisions.
Growth Areas:
May be impatient or blunt.
Can overlook details or emotions.
May struggle with teamwork if control is shared.
Best Roles:
Leadership, management, entrepreneurship, sales, crisis handling.
I – Influence
Focus: People, relationships, energy, fun.
Strengths:
Outgoing, persuasive, optimistic.
Inspires and motivates others.
Creative, brings energy to a team.
Motivators:
Social recognition, approval, popularity.
Opportunities to talk and share ideas.
Working with people rather than tasks alone.
Communication Style:
Friendly, enthusiastic, animated.
Uses stories and humor.
May avoid conflict or tough topics.
Growth Areas:
Can be disorganized or impulsive.
May exaggerate or over-promise.
Can lose focus on details or deadlines.
Best Roles:
Public relations, sales, marketing, teaching, event management.
S – Steadiness
Focus: Harmony, consistency, cooperation, relationships.
Strengths:
Loyal, dependable, supportive.
Patient and calm in stressful situations.
Good listener and team player.
Motivators:
Security, stability, clear expectations.
Long-term relationships and belonging.
Helping and serving others.
Communication Style:
Warm, calm, considerate.
Prefers one-on-one conversations.
Listens more than speaks.
Growth Areas:
May resist change or new ideas.
Can be indecisive, avoids confrontation.
Sometimes taken advantage of due to helpful nature.
Best Roles:
Counseling, teaching, HR, nursing, customer service, team support.
C – Conscientiousness
Focus: Accuracy, standards, structure, logic.
Strengths:
Detail-oriented, disciplined, analytical.
High standards, strives for excellence.
Good at planning, research, and quality control.
Motivators:
Clear rules, structure, and procedures.
Opportunities to analyze and perfect work.
Predictability and stability.
Communication Style:
Precise, factual, formal.
Avoids emotional or vague language.
Likes written details and evidence.
Growth Areas:
Can be overly critical or perfectionistic.
May avoid risks or slow decisions.
Can struggle in fast-changing environments.
Best Roles:
Accounting, law, IT, quality assurance, engineering, research.
`,
});

const generateDetailedDiscReportFlow = ai.defineFlow(
  {
    name: 'generateDetailedDiscReportFlow',
    inputSchema: GenerateDetailedDiscReportInputSchema,
    outputSchema: GenerateDetailedDiscReportOutputSchema,
  },
  async input => {
    const {dScore, iScore, sScore, cScore} = input;

    // Determine primary and secondary styles
    const scores = {D: dScore, I: iScore, S: sScore, C: cScore};
    const sortedStyles = Object.entries(scores)
        .sort(([, a], [, b]) => b - a)
        .map(([key]) => key);

    const primaryStyle = sortedStyles[0];
    const secondaryStyle = sortedStyles[1];

    const {output} = await prompt({
      ...input,
    });

    let combinationInsights = await combinationInsightsTool({
        primaryStyle: primaryStyle,
        secondaryStyle: secondaryStyle,
    })

    //Augment the prompt response
    let augmentedReport = output?.report;

    augmentedReport += `\nCombination Insights: High ${primaryStyle} + High ${secondaryStyle} -> ${combinationInsights}`;


    return {
      report: augmentedReport!,
    };
  }
);
