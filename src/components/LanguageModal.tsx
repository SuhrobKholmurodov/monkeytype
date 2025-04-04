import { CheckIcon } from 'lucide-react';

type Language = 'english' | 'russian';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageModal({
  isOpen,
  onClose,
  selectedLanguage,
  onLanguageChange,
}: LanguageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="dark:bg-white bg-gray-800 rounded-lg p-6 w-64 shadow-xl">
        <h3 className="text-lg font-bold dark:text-gray-900 text-gray-100 mb-4">Select Language</h3>

        <div className="space-y-2">
          {(['english', 'russian'] as Language[]).map((lang) => (
            <div
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`flex items-center border border-gray-700 dark:border-gray-200 justify-between p-3 rounded-md cursor-pointer
                ${
                  selectedLanguage === lang
                    ? 'dark:bg-blue-100 bg-blue-900 border-blue-900 dark:border-blue-100 dark:text-blue-800 text-blue-200'
                    : 'dark:hover:bg-gray-100 hover:bg-gray-700 dark:text-gray-700 text-gray-300'
                }
              `}
            >
              <span className="font-medium">{lang}</span>
              {selectedLanguage === lang && (
                <CheckIcon className="h-5 w-5  dark:text-blue-600 text-blue-400" />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 dark:bg-gray-200 bg-gray-700 dark:hover:bg-gray-300 hover:bg-gray-600 rounded-md dark:text-gray-800 text-gray-200 font-medium transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
