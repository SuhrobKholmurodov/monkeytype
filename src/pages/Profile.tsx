import { useState, useEffect } from 'react'
import { TestResult } from '../components/TypingArea '

const Profile = () => {
  const [pastResults, setPastResults] = useState<TestResult[]>([])

  useEffect(() => {
    const savedResults = localStorage.getItem('typingTestResults')
    if (savedResults) {
      setPastResults(JSON.parse(savedResults))
    }
  }, [])

  return (
    <div className='p-6 bg-gray-900'>
      {pastResults.length > 0 ? (
        <div>
          <h1 className='text-2xl font-bold mb-6 text-gray-200'>
            Your Past Results
          </h1>
          <div className='w-full overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-gray-800 text-gray-50'>
                  <th className='p-3 border border-gray-700 text-left'>WPM</th>
                  <th className='p-3 border border-gray-700 text-left'>
                    Accuracy
                  </th>
                  <th className='p-3 border border-gray-700 text-left'>
                    Correct
                  </th>
                  <th className='p-3 border border-gray-700 text-left'>
                    Incorrect
                  </th>
                  <th className='p-3 border border-gray-700 text-left'>Time</th>
                  <th className='p-3 border border-gray-700 text-left'>
                    Completed At
                  </th>
                </tr>
              </thead>
              <tbody>
                {pastResults.map((el, index) => (
                  <tr key={index} className='text-gray-200 transition-colors'>
                    <td className='p-3 border border-gray-700'>{el.wpm}</td>
                    <td className='p-3 border border-gray-700'>
                      {el.accuracy}%
                    </td>
                    <td className='p-3 border border-gray-700'>{el.correct}</td>
                    <td className='p-3 border border-gray-700'>
                      {el.incorrect}
                    </td>
                    <td className='p-3 border border-gray-700'>{el.time}s</td>
                    <td className='p-3 border border-gray-700'>
                      {el.completionTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className='text-gray-400'>
          No past results found. Complete a typing test to see your results
          here!
        </p>
      )}
    </div>
  )
}

export default Profile
