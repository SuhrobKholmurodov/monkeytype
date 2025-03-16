export interface TestResult {
  type: 'time' | 'words';
  duration: number;
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  time: number;
  completionTime: string;
}