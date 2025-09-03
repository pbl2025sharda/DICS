import type { Question } from './types';

const questionSet1: Question['statements'] = [
  { text: "I like taking charge and being in control.", category: "D" },
  { text: "I enjoy meeting new people and making friends.", category: "I" },
  { text: "I prefer peace and avoiding conflict.", category: "S" },
  { text: "I focus on being accurate and correct.", category: "C" },
];

const questionSet2: Question['statements'] = [
  { text: "I take risks and face challenges directly.", category: "D" },
  { text: "I am optimistic and like to motivate others.", category: "I" },
  { text: "I am supportive and dependable.", category: "S" },
  { text: "I am disciplined and follow rules.", category: "C" },
];

const questionSet3: Question['statements'] = [
  { text: "I want to win and achieve results.", category: "D" },
  { text: "I like being the center of attention.", category: "I" },
  { text: "I am calm and steady under pressure.", category: "S" },
  { text: "I check details and double-check facts.", category: "C" },
];

const questionSets = [questionSet1, questionSet2, questionSet3];

export const questions: Question[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  statements: questionSets[i % 3],
}));
