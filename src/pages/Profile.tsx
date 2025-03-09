import { useState, useEffect } from 'react'
import { TestResult } from '../components/TypingArea '
import { Pencil, UserRound } from 'lucide-react'

const Profile = () => {
  const [pastResults, setPastResults] = useState<TestResult[]>([])
  const [userName, setUserName] = useState(
    localStorage.getItem('userName') || ''
  )
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const savedResults = localStorage.getItem('typingTestResults')
    if (savedResults) {
      setPastResults(JSON.parse(savedResults))
    }
  }, [])

  const userJoinDate = localStorage.getItem('userJoinDate')

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUserName = e.target.value.trim()
    setUserName(newUserName)
    localStorage.setItem('userName', newUserName)
  }

  return (
    <div className='p-6 bg-gray-900'>
      <div className='flex justify-between gap-4 bg-gray-800 p-4 rounded-lg'>
        <div className='flex gap-4'>
          <div className='p-5 text-gray-200 bg-gray-900 rounded-full'>
            <UserRound size={30} />
          </div>
          <div className='flex flex-col'>
            {isEditing ? (
              <input
                type='text'
                value={userName}
                onChange={handleNameChange}
                onKeyDown={e => e.key === 'Enter' && setIsEditing(false)}
                autoFocus
                className='bg-gray-700 text-gray-50 font-[600] mt-[-2px] text-[24px] rounded-md p-[3px] focus:outline-none'
              />
            ) : (
              <p className='font-[600] text-gray-50 text-[24px]'>
                {userName || 'Your Name'}
              </p>
            )}
            <p className='text-gray-500'>Joined {userJoinDate}</p>
          </div>
        </div>
        <div
          id='editDiv'
          className='text-gray-300 cursor-pointer'
          onClick={handleEdit}
        >
          <Pencil />
        </div>
      </div>
      {pastResults.length > 0 ? (
        <div className='mt-5'>
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
