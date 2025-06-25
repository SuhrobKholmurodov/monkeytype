import { Tooltip } from '@mui/material';
import { RotateCw } from 'lucide-react';
import { KeyboardEvent } from 'react';

interface RestartButtonProps {
  onRestart: () => void;
}

export const RestartButton = ({ onRestart }: RestartButtonProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      onRestart();
    }
  };

  return (
    <div className={`w-full flex items-center justify-center mb-4 mt-2`}>
      <Tooltip
        title="Restart Test"
        arrow
        componentsProps={{
          tooltip: {
            style: {
              backgroundColor: 'black',
              color: 'white',
              fontSize: '14px',
            },
          },
          arrow: {
            style: {
              color: 'black',
            },
          },
        }}
      >
        <button
          onClick={onRestart}
          onKeyDown={handleKeyDown}
          className="dark:text-gray-800 focus-within:border-none focus:border-none focus:outline-none focus-within:text-gray-500 dark:focus:text-gray-500 dark:hover:text-gray-500 hover:text-gray-400 text-gray-200"
        >
          <RotateCw size={24} />
        </button>
      </Tooltip>
    </div>
  );
};