import { UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Header = () => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const currentName = localStorage.getItem('userName') || ''
    if (currentName !== userName) {
      setUserName(currentName)
    }
  })

  return (
    <header className='fixed top-0 left-0 w-full bg-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-md z-50'>
      <Link to={'/'} className='text-lg font-bold'>
        Monkey Type
      </Link>
      <Link to={'/profile'} className='flex gap-1'>
        <UserRound size={24} />
        {userName && <p>{userName}</p>}
      </Link>
    </header>
  )
}

export default Header
