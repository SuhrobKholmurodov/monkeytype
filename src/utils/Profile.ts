import { TestResult } from '~/@types';

export const getJoinDateDifference = (joinDate: string): string => {
  const joinDateObj = new Date(joinDate);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - joinDateObj.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return 'today';
  } else if (daysDifference === 1) {
    return 'yesterday';
  } else if (daysDifference < 7) {
    return `${daysDifference} days ago`;
  } else if (daysDifference < 14) {
    return 'a week ago';
  } else if (daysDifference < 30) {
    const weeks = Math.floor(daysDifference / 7);
    return `${weeks} weeks ago`;
  } else if (daysDifference < 60) {
    return 'a month ago';
  } else {
    const months = Math.floor(daysDifference / 30);
    return `${months} months ago`;
  }
};

export const getMaxWPMAndAccuracy = (
  pastResults: TestResult[],
  duration: number,
  type: 'time' | 'words',
): { maxWPM: number; accuracy: number; completedAt: string; language: string } => {
  const filteredResults = pastResults.filter(
    (result) => result.duration === duration && result.type === type,
  );

  if (filteredResults.length === 0) {
    return { maxWPM: 0, accuracy: 0, completedAt: '-', language: '-' };
  }

  const maxResult = filteredResults.reduce((prev, current) =>
    prev.wpm > current.wpm ? prev : current,
  );

  return {
    maxWPM: maxResult.wpm,
    accuracy: maxResult.accuracy,
    language: maxResult.language,
    completedAt: maxResult.completionTime,
  };
};
