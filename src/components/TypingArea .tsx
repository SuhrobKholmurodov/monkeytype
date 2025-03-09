import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { RotateCw } from 'lucide-react'

interface TypedWordData {
  word: string
  typed: string
  isCorrect: boolean
}

export interface TestResult {
  wpm: number
  accuracy: number
  correct: number
  incorrect: number
  time: number
  completionTime: string
}

const wordsArray: string[] = [
  'still',
  'child',
  'very',
  'with',
  'want',
  'seem',
  'need',
  'large',
  'there',
  'people',
  'place',
  'before',
  'again',
  'need',
  'late',
  'any',
  'to',
  'no',
  'person',
  'again',
  'not',
  'at',
  'come',
  'good',
  'get',
  'begin',
  'which',
  'when',
  'do',
  'what',
  'would',
  'eye',
  'some',
  'house',
  'also',
  'about',
  'than',
  'people',
  'both',
  'another',
  'because',
  'down',
  'nation',
  'lead',
  'should',
  'during',
  'interest',
  'those',
  'however',
  'order'
]

const TypingArea = () => {
  const [words, setWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [typedWord, setTypedWord] = useState('')
  const [typedWords, setTypedWords] = useState<TypedWordData[]>([])
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)
  const [pastResults, setPastResults] = useState<TestResult[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedResults = localStorage.getItem('typingTestResults')
    if (savedResults) {
      setPastResults(JSON.parse(savedResults))
    }
    getRandomWords()
    if (containerRef.current) {
      containerRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (finished && startTime && endTime) {
      const newResult: TestResult = {
        wpm: calculateWPM(),
        accuracy: calculateAccuracy(),
        correct: typedWords.filter(w => w.isCorrect).length,
        incorrect: typedWords.filter(w => !w.isCorrect).length,
        time: Math.round((endTime.getTime() - startTime.getTime()) / 1000),
        completionTime: new Date().toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      }

      const savedResults = localStorage.getItem('typingTestResults')
      const pastResults = savedResults ? JSON.parse(savedResults) : []
      const updatedResults = [newResult, ...pastResults]
      setPastResults(updatedResults)
      localStorage.setItem('typingTestResults', JSON.stringify(updatedResults))
    }
  }, [finished])

  function getRandomWords () {
    const mixed = [...wordsArray].sort(() => 0.5 - Math.random())
    setWords(mixed.slice(0, 10))
    setCurrentWordIndex(0)
    setTypedWord('')
    setTypedWords([])
    setStarted(false)
    setFinished(false)
    setStartTime(null)
    setEndTime(null)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (finished) return

    if (!started) {
      setStarted(true)
      setStartTime(new Date())
    }

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      if (typedWord.trim() !== '') {
        const isCorrect = typedWord === words[currentWordIndex]
        setTypedWords([
          ...typedWords,
          { word: words[currentWordIndex], typed: typedWord, isCorrect }
        ])

        if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1)
          setTypedWord('')
        } else {
          setEndTime(new Date())
          setFinished(true)
        }
      }
    } else if (e.key === 'Backspace') {
      setTypedWord(prev => prev.slice(0, -1))
    } else if (e.key.length === 1) {
      setTypedWord(prev => prev + e.key)
    }
  }

  const getCompletedWordClass = (index: number) => {
    if (index >= typedWords.length) return ''
    return typedWords[index].isCorrect ? 'text-gray-400' : 'text-red-500'
  }

  const renderCurrentWord = (word: string, typedText: string) => {
    return (
      <span className='relative'>
        {word.split('').map((char, idx) => {
          const typed = typedText[idx] || ''
          const isCorrect = typed === char

          return (
            <span
              key={idx}
              className={
                typed ? (isCorrect ? 'text-green-500' : 'text-red-500') : ''
              }
            >
              {char}
            </span>
          )
        })}
        {typedText.length > word.length && (
          <span className='text-red-500'>{typedText.slice(word.length)}</span>
        )}
        {!typedText.length && (
          <span className='absolute h-5 w-0.5 bg-gray-700 animate-pulse'></span>
        )}
      </span>
    )
  }

  const calculateWPM = () => {
    if (!startTime || !endTime) return 0
    const durationInMinutes =
      (endTime.getTime() - startTime.getTime()) / 1000 / 60
    const correctWords = typedWords.filter(item => item.isCorrect).length
    return Math.round(correctWords / durationInMinutes)
  }

  const calculateAccuracy = () => {
    if (typedWords.length === 0) return 0
    const correctWords = typedWords.filter(item => item.isCorrect).length
    return Math.round((correctWords / typedWords.length) * 100)
  }

  return (
    <div
      className='fixed flex bg-gray-900 inset-0 flex-col items-center outline-none text-gray-200 overflow-hidden'
      tabIndex={0}
      style={{ margin: 0, padding: 0 }}
      onKeyDown={handleKeyDown}
      ref={containerRef}
      onClick={() => {
        if (containerRef.current) containerRef.current.focus()
      }}
    >
      <div className='w-full max-w-7xl mt-[140px] h-full flex flex-col justify-between overflow-hidden'>
        {!finished ? (
          <div className='flex flex-col flex-grow overflow-y-auto p-6'>
            <div className='mb-8 p-4 bg-gray-800 rounded-lg shadow-md'>
              <div className='text-xl font-mono leading-relaxed space-y-1'>
                <div className='flex flex-wrap gap-2'>
                  {words.map((word, index) => (
                    <span
                      key={index}
                      className={`px-1 ${
                        index === currentWordIndex
                          ? 'bg-gray-700 rounded'
                          : index < currentWordIndex
                          ? getCompletedWordClass(index)
                          : ''
                      }`}
                    >
                      {index === currentWordIndex
                        ? renderCurrentWord(word, typedWord)
                        : word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className='w-full flex items-center justify-center mb-4'>
              <button
                onClick={getRandomWords}
                className='flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md transition-colors duration-200'
              >
                <RotateCw size={16} />
                Restart Test
              </button>
            </div>
            <div className='text-center text-gray-400 text-sm'>
              Press space after each word. ESC to restart.
            </div>
            {pastResults[0] && (
              <div className='mt-12 w-full'>
                <h3 className='text-xl font-bold mb-4 text-gray-300'>
                  Last Test Result
                </h3>
                <table className='w-full border-collapse'>
                  <thead>
                    <tr className='bg-gray-800'>
                      <th className='p-3 border border-gray-700 text-left'>
                        WPM
                      </th>
                      <th className='p-3 border border-gray-700 text-left'>
                        Accuracy
                      </th>
                      <th className='p-3 border border-gray-700 text-left'>
                        Correct Words
                      </th>
                      <th className='p-3 border border-gray-700 text-left'>
                        Incorrect Words
                      </th>
                      <th className='p-3 border border-gray-700 text-left'>
                        Total Time
                      </th>
                      <th className='p-3 border border-gray-700 text-left'>
                        Completed At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='p-3 border border-gray-700'>
                        {pastResults[0].wpm}
                      </td>
                      <td className='p-3 border border-gray-700'>
                        {pastResults[0].accuracy}%
                      </td>
                      <td className='p-3 border border-gray-700'>
                        {pastResults[0].correct}
                      </td>
                      <td className='p-3 border border-gray-700'>
                        {pastResults[0].incorrect}
                      </td>
                      <td className='p-3 border border-gray-700'>
                        {pastResults[0].time} sec
                      </td>
                      <td className='p-3 border border-gray-700'>
                        {pastResults[0].completionTime}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className='flex flex-col items-center flex-grow overflow-y-auto p-6'>
            <div className='flex gap-8 mb-8'>
              <div className='text-center'>
                <div className='text-4xl font-bold text-green-500'>
                  {calculateWPM()}
                </div>
                <div className='text-sm text-gray-400'>WPM</div>
              </div>

              <div className='text-center'>
                <div className='text-4xl font-bold text-blue-500'>
                  {calculateAccuracy()}%
                </div>
                <div className='text-sm text-gray-400'>Accuracy</div>
              </div>

              <div className='text-center'>
                <div className='text-4xl font-bold text-purple-500'>
                  {startTime && endTime
                    ? Math.round(
                        (endTime.getTime() - startTime.getTime()) / 1000
                      )
                    : 0}
                </div>
                <div className='text-sm text-gray-400'>Seconds</div>
              </div>
            </div>

            <button
              onClick={getRandomWords}
              className='flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md transition-colors duration-200'
            >
              <RotateCw size={16} />
              Restart Test
            </button>

            <div className='mt-12 w-full'>
              <h3 className='text-xl font-bold mb-4 text-gray-300'>
                Detailed Results
              </h3>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='bg-gray-800'>
                    <th className='p-3 border border-gray-700 text-left'>
                      WPM
                    </th>
                    <th className='p-3 border border-gray-700 text-left'>
                      Accuracy
                    </th>
                    <th className='p-3 border border-gray-700 text-left'>
                      Correct Words
                    </th>
                    <th className='p-3 border border-gray-700 text-left'>
                      Incorrect Words
                    </th>
                    <th className='p-3 border border-gray-700 text-left'>
                      Total Time
                    </th>
                    <th className='p-3 border border-gray-700 text-left'>
                      Completed At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='p-3 border border-gray-700'>
                      {calculateWPM()}
                    </td>
                    <td className='p-3 border border-gray-700'>
                      {calculateAccuracy()}%
                    </td>
                    <td className='p-3 border border-gray-700'>
                      {typedWords.filter(w => w.isCorrect).length}
                    </td>
                    <td className='p-3 border border-gray-700'>
                      {typedWords.filter(w => !w.isCorrect).length}
                    </td>
                    <td className='p-3 border border-gray-700'>
                      {startTime && endTime
                        ? Math.round(
                            (endTime.getTime() - startTime.getTime()) / 1000
                          )
                        : 0}{' '}
                      sec
                    </td>
                    <td className='p-3 border border-gray-700'>
                      {new Date().toLocaleString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TypingArea
