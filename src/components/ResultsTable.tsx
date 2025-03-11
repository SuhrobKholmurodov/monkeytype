import { TestResult } from './TypingArea '
import { calculateWPM, calculateAccuracy } from '~/utils'

interface ResultsTableProps {
  activeType: 'time' | 'words'
  activeDuration: number
  activeWordsCount: number
  typedWords: { word: string; typed: string; isCorrect: boolean }[]
  startTime: Date | null
  endTime: Date | null
}

export const ResultsTable = ({
  activeType,
  activeDuration,
  activeWordsCount,
  typedWords,
  startTime,
  endTime
}: ResultsTableProps) => {
  const wpm = calculateWPM(
    startTime,
    endTime,
    typedWords.filter(item => item.isCorrect).length
  )
  const accuracy = calculateAccuracy(typedWords)

  const results: TestResult[] = [
    {
      type: activeType,
      duration: activeType === 'time' ? activeDuration : activeWordsCount,
      wpm,
      accuracy,
      correct: typedWords.filter(w => w.isCorrect).length,
      incorrect: typedWords.filter(w => !w.isCorrect).length,
      time:
        startTime && endTime
          ? Math.round((endTime.getTime() - startTime.getTime()) / 1000)
          : 0,
      completionTime: new Date().toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  ]

  return (
    <div className='w-full'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='bg-gray-800'>
            <th className='p-3 border border-gray-700 text-left'>Type</th>
            <th className='p-3 border border-gray-700 text-left'>WPM</th>
            <th className='p-3 border border-gray-700 text-left'>Accuracy</th>
            <th className='p-3 border border-gray-700 text-left'>
              Correct Words
            </th>
            <th className='p-3 border border-gray-700 text-left'>
              Incorrect Words
            </th>
            <th className='p-3 border border-gray-700 text-left'>Total Time</th>
            <th className='p-3 border border-gray-700 text-left'>
              Completed At
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td className='p-3 border border-gray-700'>
                <div className='flex items-center gap-1'>
                  <div className='text-[20px] font-bold'>{result.duration}</div>
                  <div className='text-gray-400'>
                    {result.type === 'time' ? 'Seconds' : 'Words'}
                  </div>
                </div>
              </td>
              <td className='p-3 border border-gray-700'>{result.wpm}</td>
              <td className='p-3 border border-gray-700'>{result.accuracy}%</td>
              <td className='p-3 border border-gray-700'>{result.correct}</td>
              <td className='p-3 border border-gray-700'>
                {result.incorrect === 0 ? '-' : result.incorrect}
              </td>
              <td className='p-3 border border-gray-700'>{result.time} sec</td>
              <td className='p-3 border border-gray-700'>
                {result.completionTime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
