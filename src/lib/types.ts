export type DiscCategory = "D" | "I" | "S" | "C";

export type Statement = {
  text: string;
  category: DiscCategory;
};

export type Question = {
  id: number;
  statements: Statement[];
};

export type DiscScores = {
  D: number;
  I: number;
  S: number;
  C: number;
};

export type RankedStyle = {
  style: DiscCategory;
  score: number;
  interpretation: "High" | "Moderate" | "Low";
  description: string;
};
