import { useState } from 'react';
import { Clock, MessageSquareQuote } from 'lucide-react';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import HandymanIcon from '@mui/icons-material/Handyman';
import { GameModeModal } from './GameModeModal';

interface FilterProps {
  type: 'time' | 'words' | 'quote';
  duration: number;
  wordsCount: number;
  quoteSize: 'short' | 'medium' | 'long';
  onChange: (type: 'time' | 'words' | 'quote', value: number | string) => void;
}

export const Filter = ({ type, duration, wordsCount, quoteSize, onChange }: FilterProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center dark:text-gray-900 justify-between px-[140px] mb-[50px]">
        <div className="flex rounded-lg dark:bg-gray-300 bg-gray-800 items-center p-3 gap-6">
          <div
            className={`flex items-center hover:text-gray-400 duration-100 py-[5px] px-[12px] gap-2 cursor-pointer ${
              type === 'time' ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg' : ''
            }`}
            onClick={() => onChange('time', duration)}
          >
            <Clock />
            <p className="font-bold">time</p>
          </div>
          <div className="h-6 w-2 bg-gray-600 dark:bg-gray-50 rounded-md"></div>
          <div
            className={`flex items-center hover:text-gray-400 duration-100 py-[5px] px-[12px] gap-2 cursor-pointer ${
              type === 'words' ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg' : ''
            }`}
            onClick={() => onChange('words', wordsCount)}
          >
            <TextFormatIcon />
            <p className="font-[700] mt-[-5px]">words</p>
          </div>
          <div className="h-6 w-2 bg-gray-600 dark:bg-gray-50 rounded-md"></div>
          <div
            className={`flex items-center hover:text-gray-400 duration-100 py-[5px] px-[12px] gap-2 cursor-pointer ${
              type === 'quote' ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg' : ''
            }`}
            onClick={() => onChange('quote', quoteSize)}
          >
            <MessageSquareQuote />
            <p className="font-[700] mt-[-5px]">quote</p>
          </div>
        </div>

        <div className="flex rounded-lg bg-gray-800 dark:bg-gray-300 items-center py-3 px-4 gap-5">
          {type === 'time' ? (
            <>
              <p
                className={`cursor-pointer hover:text-gray-400 duration-100 font-bold py-[5px] px-[12px] ${
                  duration === 15
                    ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg'
                    : ''
                }`}
                onClick={() => onChange('time', 15)}
              >
                15
              </p>
              <div className="h-6 w-2 bg-gray-600 dark:bg-gray-50 rounded-md"></div>
              <p
                className={`cursor-pointer hover:text-gray-400 duration-100 font-bold py-[5px] px-[12px] ${
                  duration === 30
                    ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg'
                    : ''
                }`}
                onClick={() => onChange('time', 30)}
              >
                30
              </p>
              <div className="h-6 w-2 bg-gray-600 dark:bg-gray-50 rounded-md"></div>
              <p
                className={`cursor-pointer hover:text-gray-400 duration-100 font-bold py-[5px] px-[12px] ${
                  duration === 60
                    ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg'
                    : ''
                }`}
                onClick={() => onChange('time', 60)}
              >
                60
              </p>
              <div className="h-6 w-2 bg-gray-600 dark:bg-gray-50 rounded-md"></div>
              <p
                className={`cursor-pointer hover:text-gray-400 duration-100 font-bold py-[5px] px-[12px] ${
                  duration === 120
                    ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg'
                    : ''
                }`}
                onClick={() => onChange('time', 120)}
              >
                120
              </p>
              <div className="h-6 w-2 bg-gray-600 dark:bg-gray-50 rounded-md"></div>
              <p
                className={`cursor-pointer hover:text-gray-400 duration-100 font-bold py-[5px] px-[12px] ${
                  isModalOpen || ![15, 30, 60, 120].includes(duration)
                    ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg'
                    : ''
                }`}
                onClick={() => setIsModalOpen(true)}
              >
                <HandymanIcon fontSize="small" />
              </p>
            </>
          ) : type === 'words' ? (
            <>
              <p
                className={`cursor-pointer hover:text-gray-400 duration-100 font-bold py-[5px] px-[12px] ${
                  wordsCount === 10
                    ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg'
                    : ''
                }`}
                onClick={() => onChange('words', 10)}
              >
                10
              </p>
              <div className="h-6 w-2 bg-gray-600 dark:bg-gray-50 rounded-md"></div>
              <p
                className={`cursor-pointer hover:text-gray-400 duration-100 font-bold py-[5px] px-[12px] ${
                  wordsCount === 25
                    ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg'
                    : ''
                }`}
                onClick={() => onChange('words', 25)}
              >
                25
              </p>
              <div className="h-6 w-2 bg-gray-600 dark:bg-gray-50 rounded-md"></div>
              <p
                className={`cursor-pointer hover:text-gray-400 duration-100 font-bold py-[5px] px-[12px] ${
                  wordsCount === 50
                    ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg'
                    : ''
                }`}
                onClick={() => onChange('words', 50)}
              >
                50
              </p>
              <div className="h-6 w-2 bg-gray-600 dark:bg-gray-50 rounded-md"></div>
              <p
                className={`cursor-pointer hover:text-gray-400 duration-100 font-bold py-[5px] px-[12px] ${
                  wordsCount === 100
                    ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg'
                    : ''
                }`}
                onClick={() => onChange('words', 100)}
              >
                100
              </p>
              <div className="h-6 w-2 bg-gray-600 dark:bg-gray-50 rounded-md"></div>
              <p
                className={`cursor-pointer hover:text-gray-400 duration-100 font-bold py-[5px] px-[12px] ${
                  isModalOpen || ![10, 25, 50, 100].includes(wordsCount)
                    ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg'
                    : ''
                }`}
                onClick={() => setIsModalOpen(true)}
              >
                <HandymanIcon fontSize="small" />
              </p>
            </>
          ) : (
            <>
              <p
                className={`cursor-pointer hover:text-gray-400 duration-100 font-bold py-[5px] px-[12px] ${
                  quoteSize === 'short'
                    ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg'
                    : ''
                }`}
                onClick={() => onChange('quote', 'short')}
              >
                short
              </p>
              <div className="h-6 w-2 bg-gray-600 dark:bg-gray-50 rounded-md"></div>
              <p
                className={`cursor-pointer hover:text-gray-400 duration-100 font-bold py-[5px] px-[12px] ${
                  quoteSize === 'medium'
                    ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg'
                    : ''
                }`}
                onClick={() => onChange('quote', 'medium')}
              >
                medium
              </p>
              <div className="h-6 w-2 bg-gray-600 dark:bg-gray-50 rounded-md"></div>
              <p
                className={`cursor-pointer hover:text-gray-400 duration-100 font-bold py-[5px] px-[12px] ${
                  quoteSize === 'long'
                    ? 'bg-gray-700 dark:bg-gray-100 text-[#e2b714] rounded-lg'
                    : ''
                }`}
                onClick={() => onChange('quote', 'long')}
              >
                long
              </p>
            </>
          )}
        </div>
      </div>
      <GameModeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(value) => onChange(type, value)}
        type={type}
        currentValue={type === 'time' ? duration : wordsCount}
      />
    </>
  );
};
