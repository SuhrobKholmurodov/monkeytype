import { RotateCw } from 'lucide-react'
import { useState, useEffect } from 'react'

const wordsArray = [
  'still',
  'child',
  'very',
  'with',
  'want',
  'seem',
  'need',
  'large',
  'there',
  'people',
  'place',
  'before',
  'again',
  'need',
  'late',
  'any',
  'to',
  'no',
  'person',
  'again',
  'not',
  'at',
  'come',
  'good',
  'get',
  'begin',
  'which',
  'when',
  'do',
  'what',
  'would',
  'eye',
  'some',
  'house',
  'also',
  'about',
  'than',
  'people',
  'both',
  'another',
  'because',
  'down',
  'nation',
  'lead',
  'should',
  'during',
  'interest',
  'those',
  'however',
  'order'
]

const TypingArea = () => {
  const [words, setWords] = useState<string[]>([])

  function getRandomWords () {
    const mixed = [...wordsArray].sort(() => 0.5 - Math.random())
    setWords(mixed.slice(0, 25))
  }

  useEffect(() => {
    getRandomWords()
  }, [])

  return (
    <div className='px-12'>
      <ul className='flex font-[500] text-[22px] flex-wrap gap-[10px]'>
        {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
      <div className='flex justify-center mt-4'>
        <RotateCw className='cursor-pointer' onClick={getRandomWords} />
      </div>
    </div>
  )
}

export default TypingArea
