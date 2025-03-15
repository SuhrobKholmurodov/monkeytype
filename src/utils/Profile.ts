import { TestResult } from '~/components'

export const getJoinDateDifference = (joinDate: string): string => {
  const joinDateObj = new Date(joinDate)
  const currentDate = new Date()
  const timeDifference = currentDate.getTime() - joinDateObj.getTime()
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  if (daysDifference === 0) {
    return 'today'
  } else if (daysDifference === 1) {
    return 'yesterday'
  } else {
    return `${daysDifference} days ago`
  }
}

export const getMaxWPMAndAccuracy = (
  pastResults: TestResult[],
  duration: number,
  type: 'time' | 'words'
): { maxWPM: number; accuracy: number; completedAt: string } => {
  const filteredResults = pastResults.filter(
    result => result.duration === duration && result.type === type
  )

  if (filteredResults.length === 0) {
    return { maxWPM: 0, accuracy: 0, completedAt: '-' }
  }

  const maxResult = filteredResults.reduce((prev, current) =>
    prev.wpm > current.wpm ? prev : current
  )

  return {
    maxWPM: maxResult.wpm,
    accuracy: maxResult.accuracy,
    completedAt: maxResult.completionTime
  }
}
