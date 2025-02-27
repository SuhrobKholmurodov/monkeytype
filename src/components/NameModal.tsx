import React, { useState } from 'react'

interface NameModalProps {
  isOpen: boolean
  onClose: () => void
}

const NameModal = ({ isOpen, onClose }: NameModalProps) => {
  const [localName, setLocalName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('userName', localName)
    onClose()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50'>
      <div className='bg-white p-6 sm:p-4 rounded-lg shadow-lg text-center w-11/12 max-w-sm transition-all'>
        <h2 className='text-xl text-gray-800 mb-4'>
          Welcome to the Typing Test!
        </h2>
        <p className='text-gray-600 mb-6 text-base leading-relaxed'>
          Enter your name to start the typing test. Your speed and accuracy will
          be tracked.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={localName}
            onChange={e => setLocalName(e.target.value)}
            placeholder='Enter your name'
            className='p-3 mb-4 w-full rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-green-500'
          />
          <button
            type='submit'
            className='w-full p-3 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 focus:outline-none'
          >
            Start Typing Test
          </button>
        </form>
      </div>
    </div>
  )
}

export default NameModal
