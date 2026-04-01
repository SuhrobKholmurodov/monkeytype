export type Language = "english" | "russian" | "german";
export interface TestResult {
  type: "time" | "words" | "quote";
  duration: number;
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  time: number;
  completionTime: string;
  quoteSize?: "short" | "medium" | "long";
  language: Language;
  date?: string;
}
