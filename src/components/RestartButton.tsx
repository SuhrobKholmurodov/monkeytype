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
    <div className={`w-full flex items-center justify-center mb-4`}>
      <button
        onClick={onRestart}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-2 px-6 py-3 dark:bg-gray-300 dark:text-gray-800 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md transition-colors duration-200"
      >
        <RotateCw size={16} />
        Restart Test
      </button>
    </div>
  );
};