export const calculateWPM = (
  startTime: Date | null,
  endTime: Date | null,
  correctWords: number
): number => {
  if (!startTime || !endTime) return 0
  const durationInMinutes =
    (endTime.getTime() - startTime.getTime()) / 1000 / 60
  return Math.round(correctWords / durationInMinutes)
}

export const calculateAccuracy = (
  typedWords: { isCorrect: boolean }[]
): number => {
  if (typedWords.length === 0) return 0
  const correctWords = typedWords.filter(item => item.isCorrect).length
  return Math.round((correctWords / typedWords.length) * 100)
}
