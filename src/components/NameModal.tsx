import React, { useState } from 'react'

interface NameModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NameModal = ({ isOpen, onClose }: NameModalProps) => {
  const [localName, setLocalName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('userName', localName)

    if (!localStorage.getItem('userJoinDate')) {
      const currentDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
      localStorage.setItem('userJoinDate', currentDate)
    }
    onClose()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50'>
      <div className='relative bg-white p-6 sm:p-4 rounded-lg shadow-lg text-center w-11/12 max-w-sm transition-all overflow-hidden'>
        <div
          className='absolute top-0 left-0 w-full h-full bg-[#22375d]'
          style={{
            clipPath: 'polygon(0 0, 9% 0, 58% 44%, 6% 100%, 0 100%, 0% 50%)'
          }}
        ></div>
        <h2 className='text-2xl text-black mb-4 relative z-10'>
          Typing Test!
        </h2>
        <form onSubmit={handleSubmit} className='relative z-10'>
          <input
            type='text'
            value={localName}
            onChange={e => setLocalName(e.target.value)}
            placeholder='Enter your name'
            className='p-3 mb-4 w-full rounded-md border border-gray-300 text-base focus:outline-none focus:ring-1 focus:ring-[#6d93d9]'
          />
          <button
            type='submit'
            className='w-full p-3 bg-[#2c4779] text-white rounded-md font-semibold hover:bg-[#3f609c] focus:outline-none'
          >
            Start Typing Test
          </button>
        </form>
      </div>
    </div>
  )
}