export interface TestResult {
  type: 'time' | 'words' | 'quote';
  duration: number;
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  time: number;
  completionTime: string;
  quoteSize?: 'short' | 'medium' | 'long'; 
  language: 'english' | 'russian'
  date?: string
}

export type Language = 'english' | 'russian';
