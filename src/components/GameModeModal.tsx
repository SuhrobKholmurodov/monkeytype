import { useState, useEffect, useRef } from 'react';

interface GameModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: number) => void;
  type: 'time' | 'words';
  currentValue?: number;
}

export const GameModeModal = ({
  isOpen,
  onClose,
  onSubmit,
  type,
  currentValue,
}: GameModeModalProps) => {
  const [value, setValue] = useState(currentValue?.toString() || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(currentValue?.toString() || '');
  }, [isOpen, type, currentValue]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = () => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      onSubmit(numValue);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 p-6 rounded-lg w-96 max-w-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-[#e2b714]">
          Custom {type === 'time' ? 'Time' : 'Words'}
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-300">
            {type === 'time' ? 'Time in seconds' : 'Number of words'}
          </label>
          <input
            ref={inputRef}
            type="number"
            min="1"
            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e2b714] text-white"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Enter ${type === 'time' ? 'time (e.g. 45)' : 'words count (e.g. 75)'}`}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition text-white font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!value || parseInt(value) <= 0}
            className={`px-4 py-2 rounded-lg transition font-bold ${
              !value || parseInt(value) <= 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-[#e2b714] text-gray-900 hover:bg-[#d1a713]'
            }`}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
