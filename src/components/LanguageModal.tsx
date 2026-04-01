import { XIcon, CheckIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Language } from "~/@types";

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageModal = ({
  isOpen,
  onClose,
  selectedLanguage,
  onLanguageChange,
}: LanguageModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const languages: { id: Language; label: string }[] = [
    { id: "english", label: "English" },
    { id: "russian", label: "Russian" },
    { id: "german", label: "German" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useHotkeys(
    "esc",
    () => {
      if (isOpen) onClose();
    },
    [isOpen],
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div
        ref={modalRef}
        className="dark:bg-white bg-gray-800 rounded-lg p-6 w-[300px] shadow-xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute p-1 transition-colors rounded-full top-3 right-3 hover:bg-gray-500 dark:hover:bg-gray-300"
          aria-label="Close language selector"
        >
          <XIcon className="w-5 h-5 text-gray-100 dark:text-gray-900 dark:hover:text-gray-600" />
        </button>

        <h3 className="pr-6 mb-4 text-lg font-bold text-gray-100 dark:text-gray-900">
          Select Language
        </h3>

        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => {
                onLanguageChange(lang.id);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-3 rounded-md cursor-pointer border transition-colors duration-200 ${
                selectedLanguage === lang.id
                  ? "dark:bg-blue-100 bg-blue-900 border-blue-900 dark:border-blue-100 dark:text-blue-800 text-blue-200"
                  : "border-gray-700 dark:border-gray-200 dark:hover:bg-gray-100 hover:bg-gray-700 dark:text-gray-700 text-gray-300"
              }`}
            >
              <span className="font-medium">{lang.label}</span>
              {selectedLanguage === lang.id && (
                <CheckIcon className="w-5 h-5 text-blue-400 dark:text-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
