import { RotateCw } from 'lucide-react'
import { useState, useEffect } from 'react'

const TypingArea = () => {
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchFilteredWords () {
    const response = await fetch(
      'https://random-word-api.vercel.app/api?words=20'
    )
    const words = await response.json()
    setWords(words)
    setLoading(false) 
  }

  useEffect(() => {
    fetchFilteredWords()
  }, [])

  return (
    <div className='px-12'>
      <ul className='flex font-[500] text-[22px] flex-wrap gap-[10px]'>
        {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
      {!loading && (
        <div className='flex justify-center mt-4'>
          <RotateCw />
        </div>
      )}
    </div>
  )
}

export default TypingArea
