import { useState } from 'react';

interface GameModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: number) => void;
  type: 'time' | 'words';
}

export const GameModeModal = ({ isOpen, onClose, onSubmit, type }: GameModeModalProps) => {
  const [value, setValue] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Custom {type === 'time' ? 'Time' : 'Words'}</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            {type === 'time' ? 'Time in seconds' : 'Number of words'}
          </label>
          <input
            type="number"
            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#e2b714]"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`Enter ${type === 'time' ? 'time' : 'words'} count`}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const numValue = parseInt(value);
              if (!isNaN(numValue)) {
                onSubmit(numValue);
                onClose();
              }
            }}
            className="px-4 py-2 bg-[#e2b714] text-gray-900 rounded hover:bg-[#d1a713] transition font-bold"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
