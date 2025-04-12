import { TypedWordData } from '~/components';

export const calculateWPM = (
  startTime: Date | null,
  endTime: Date | null,
  typedWords: TypedWordData[],
): number => {
  if (!startTime || !endTime) return 0;
  const durationInMinutes = (endTime.getTime() - startTime.getTime()) / 1000 / 60;
  const correctWords = typedWords.filter((item) => item.isCorrect).length;
  return Math.round(correctWords / durationInMinutes);
};

export const calculateAccuracy = (typedWords: TypedWordData[]): number => {
  if (typedWords.length === 0) return 0;
  const correctWords = typedWords.filter((item) => item.isCorrect).length;
  return Math.round((correctWords / typedWords.length) * 100);
};

export const formatTimeLeft = (seconds: number): string => {
  if (seconds < 60) {
    return seconds.toString();
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formattedSecs = secs < 10 ? `0${secs}` : secs.toString();
  return `${mins}:${formattedSecs}`;
};