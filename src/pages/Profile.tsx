import { useState, useEffect } from 'react'
import { Pencil, UserRound } from 'lucide-react'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import { TestResult } from '../components/TypingArea '
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Helmet } from 'react-helmet-async'

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

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName')
    if (storedUserName) {
      setUserName(storedUserName)
    }
  }, [])

  const userJoinDate = localStorage.getItem('userJoinDate')

  const getJoinDateDifference = (joinDate: string) => {
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

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUserName = e.target.value.trim()
    setUserName(newUserName)
    localStorage.setItem('userName', newUserName)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      localStorage.setItem('userName', userName)
      toast.success('Username updated successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      setTimeout(() => {
        window.location.reload()
      }, 3000) 
    }
  }

  return (
    <div className='p-6 overflow-y-scroll fixed inset-0 bg-gray-900'>
      <Helmet>
        <title>Account | Monkeytype</title>
        <meta
          name='description'
          content='Manage your Monkeytype account. View your typing test history, update your profile, and track your progress.'
        />
        <meta
          name='keywords'
          content='Monkeytype account, typing test history, profile settings, typing progress, typing statistics'
        />
      </Helmet>
      <div className='flex mt-[70px] justify-between gap-4 bg-gray-800 p-4 rounded-lg'>
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
                onKeyDown={handleKeyDown}
                autoFocus
                className='bg-gray-700 text-gray-50 font-[600] mt-[-2px] text-[24px] rounded-md pr-[3px] pt-[3px] pl-[2px] pb-[3px] focus:outline-none'
              />
            ) : (
              <p className='font-[600] text-gray-50 text-[24px]'>
                {userName || 'Your Name'}
              </p>
            )}
            <Tooltip
              title={
                userJoinDate
                  ? 'Joined ' + getJoinDateDifference(userJoinDate)
                  : 'No join date found'
              }
              slots={{
                transition: Zoom
              }}
              slotProps={{
                transition: { timeout: 300 }
              }}
              arrow
              placement='right'
              componentsProps={{
                tooltip: {
                  style: {
                    backgroundColor: 'black',
                    color: 'white',
                    fontSize: '14px'
                  }
                },
                arrow: {
                  style: {
                    color: 'black'
                  }
                }
              }}
            >
              <p className='text-gray-500 hover:cursor-pointer'>
                Joined {userJoinDate}
              </p>
            </Tooltip>
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
                  <tr
                    key={index}
                    className='text-gray-200 hover:bg-gray-800 transition-colors'
                  >
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
