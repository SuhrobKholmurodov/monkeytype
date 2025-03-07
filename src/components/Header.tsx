import { UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = () => {
  const userName = localStorage.getItem('userName')
  return (
    <header className='fixed top-0 left-0 w-full bg-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-md z-50'>
      <Link to={"/"} className='text-lg font-bold'>Monkey Type</Link>
      <Link to={'/profile'} className='flex gap-1'>
        <UserRound size={24} />
        {userName && <p>{userName}</p>}
      </Link>
    </header>
  )
}

export default Header
