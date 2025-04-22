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



 export const updateStreakData = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastActiveDate = localStorage.getItem('lastActiveDate');
    const currentStreak = parseInt(localStorage.getItem('currentStreak') || '0');
    const maxStreak = parseInt(localStorage.getItem('maxStreak') || '0');

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    let newStreak = currentStreak;
    if (!lastActiveDate || lastActiveDate < yesterdayStr) {
      if (lastActiveDate !== today) {
        newStreak = 1;
      }
    } else if (lastActiveDate === yesterdayStr) {
      newStreak = currentStreak + 1;
    }
    const newMaxStreak = Math.max(maxStreak, newStreak);
    localStorage.setItem('lastActiveDate', today);
    localStorage.setItem('currentStreak', newStreak.toString());
    localStorage.setItem('maxStreak', newMaxStreak.toString());
  };