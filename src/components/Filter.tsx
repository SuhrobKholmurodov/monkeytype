import { useState } from 'react';
import { Clock } from 'lucide-react';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import HandymanIcon from '@mui/icons-material/Handyman';
import { GameModeModal } from './GameModeModal';

interface FilterProps {
  type: 'time' | 'words';
  duration: number;
  wordsCount: number;
  onChange: (type: 'time' | 'words', value: number) => void;
}

export const Filter = ({ type, duration, wordsCount, onChange }: FilterProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-[180px] mb-[50px]">
        <div className="flex rounded-lg bg-gray-800 items-center p-3 gap-4">
          <div
            className={`flex items-center py-[5px] px-[12px] gap-2 cursor-pointer ${
              type === 'time' ? 'bg-gray-700 text-[#e2b714] rounded-lg' : ''
            }`}
            onClick={() => onChange('time', duration)}
          >
            <Clock />
            <p className="font-bold">time</p>
          </div>
          <div className="h-6 w-2 bg-gray-600 rounded-md"></div>
          <div
            className={`flex items-center py-[5px] px-[12px] gap-2 cursor-pointer ${
              type === 'words' ? 'bg-gray-700 text-[#e2b714] rounded-lg' : ''
            }`}
            onClick={() => onChange('words', wordsCount)}
          >
            <TextFormatIcon />
            <p className="font-bold">words</p>
          </div>
        </div>

        <div className="flex rounded-lg bg-gray-800 items-center py-3 px-4 gap-5">
          {type === 'time' ? (
            <>
              <p
                className={`cursor-pointer font-bold py-[5px] px-[12px] ${
                  duration === 15 ? 'bg-gray-700 text-[#e2b714] rounded-lg' : ''
                }`}
                onClick={() => onChange('time', 15)}
              >
                15
              </p>
              <div className="h-6 w-2 bg-gray-600 rounded-md"></div>
              <p
                className={`cursor-pointer font-bold py-[5px] px-[12px] ${
                  duration === 30 ? 'bg-gray-700 text-[#e2b714] rounded-lg' : ''
                }`}
                onClick={() => onChange('time', 30)}
              >
                30
              </p>
              <div className="h-6 w-2 bg-gray-600 rounded-md"></div>
              <p
                className={`cursor-pointer font-bold py-[5px] px-[12px] ${
                  duration === 60 ? 'bg-gray-700 text-[#e2b714] rounded-lg' : ''
                }`}
                onClick={() => onChange('time', 60)}
              >
                60
              </p>
              <div className="h-6 w-2 bg-gray-600 rounded-md"></div>
              <p
                className={`cursor-pointer font-bold py-[5px] px-[12px] ${
                  duration === 120 ? 'bg-gray-700 text-[#e2b714] rounded-lg' : ''
                }`}
                onClick={() => onChange('time', 120)}
              >
                120
              </p>
              <div className="h-6 w-2 bg-gray-600 rounded-md"></div>
              <p
                className={`cursor-pointer font-bold py-[5px] px-[12px] ${
                  duration === 120 ? 'bg-gray-700 text-[#e2b714] rounded-lg' : ''
                }`}
                onClick={() => setIsModalOpen(true)}
              >
                <HandymanIcon fontSize="small" />
              </p>
            </>
          ) : (
            <>
              <p
                className={`cursor-pointer font-bold py-[5px] px-[12px] ${
                  wordsCount === 10 ? 'bg-gray-700 text-[#e2b714] rounded-lg' : ''
                }`}
                onClick={() => onChange('words', 10)}
              >
                10
              </p>
              <div className="h-6 w-2 bg-gray-600 rounded-md"></div>
              <p
                className={`cursor-pointer font-bold py-[5px] px-[12px] ${
                  wordsCount === 25 ? 'bg-gray-700 text-[#e2b714] rounded-lg' : ''
                }`}
                onClick={() => onChange('words', 25)}
              >
                25
              </p>
              <div className="h-6 w-2 bg-gray-600 rounded-md"></div>
              <p
                className={`cursor-pointer font-bold py-[5px] px-[12px] ${
                  wordsCount === 50 ? 'bg-gray-700 text-[#e2b714] rounded-lg' : ''
                }`}
                onClick={() => onChange('words', 50)}
              >
                50
              </p>
              <div className="h-6 w-2 bg-gray-600 rounded-md"></div>
              <p
                className={`cursor-pointer font-bold py-[5px] px-[12px] ${
                  wordsCount === 100 ? 'bg-gray-700 text-[#e2b714] rounded-lg' : ''
                }`}
                onClick={() => onChange('words', 100)}
              >
                100
              </p>
              <div className="h-6 w-2 bg-gray-600 rounded-md"></div>
              <p
                className={`cursor-pointer font-bold py-[5px] px-[12px] ${
                  duration === 120 ? 'bg-gray-700 text-[#e2b714] rounded-lg' : ''
                }`}
                onClick={() => setIsModalOpen(true)}
              >
                <HandymanIcon fontSize="small" />
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
      />
    </>
  );
};
