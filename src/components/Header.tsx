import { UserRound, Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const Header = () => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const currentName = localStorage.getItem('userName') || ''
    if (currentName !== userName) {
      setUserName(currentName)
    }
  }, [userName])

  return (
    <header className='fixed top-0 left-0 w-full bg-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-md z-50'>
      <div className='flex items-center space-x-6'>
        <Link to={'/'} className='text-lg font-bold'>
          Monkey Type
        </Link>
      </div>

      <div className='flex gap-6 items-center'>
        <a
          href='https://github.com/SuhrobKholmurodov/monkeytype'
          target='_blank'
          className='flex hover:text-[#3e5dd7] gap-1'
        >
          <Github size={24} />
          GitHub
        </a>
        <Link to={'/profile'} className='flex items-center gap-1'>
          <UserRound size={24} />
          {userName && <p>{userName}</p>}
        </Link>
      </div>
    </header>
  )
}
