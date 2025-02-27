import { UserRound } from 'lucide-react'

const Header = () => {
  const userName = localStorage.getItem('userName')
  return (
    <header className='fixed top-0 left-0 w-full bg-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-md z-50'>
      <p className='text-lg font-bold'>Monkey Type</p>
      <div className='flex gap-1'>
        <UserRound size={24} />
        {userName && <p>{userName}</p>}
      </div>
    </header>
  )
}

export default Header
