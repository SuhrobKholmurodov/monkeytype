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
    [isOpen]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="dark:bg-white bg-gray-800 rounded-lg p-6 w-[300px] shadow-xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-500 dark:hover:bg-gray-300 transition-colors"
          aria-label="Close language selector"
        >
          <XIcon className="h-5 w-5 dark:text-gray-900 dark:hover:text-gray-600 text-gray-100" />
        </button>
        <h3 className="text-lg font-bold dark:text-gray-900 text-gray-100 mb-4 pr-6">
          Select Language
        </h3>
        <div className="space-y-3">
          <button
            onClick={() => {
              onLanguageChange("english");
              onClose();
            }}
            className={`w-full flex items-center justify-between p-3 rounded-md cursor-pointer border ${
              selectedLanguage === "english"
                ? "dark:bg-blue-100 bg-blue-900 border-blue-900 dark:border-blue-100 dark:text-blue-800 text-blue-200"
                : "border-gray-700 dark:border-gray-200 dark:hover:bg-gray-100 hover:bg-gray-700 dark:text-gray-700 text-gray-300"
            }`}
          >
            <span className="font-medium">English</span>
            {selectedLanguage === "english" && (
              <CheckIcon className="h-5 w-5 dark:text-blue-600 text-blue-400" />
            )}
          </button>
          <button
            onClick={() => {
              onLanguageChange("russian");
              onClose();
            }}
            className={`w-full flex items-center justify-between p-3 rounded-md cursor-pointer border ${
              selectedLanguage === "russian"
                ? "dark:bg-blue-100 bg-blue-900 border-blue-900 dark:border-blue-100 dark:text-blue-800 text-blue-200"
                : "border-gray-700 dark:border-gray-200 dark:hover:bg-gray-100 hover:bg-gray-700 dark:text-gray-700 text-gray-300"
            }`}
          >
            <span className="font-medium">Russian</span>
            {selectedLanguage === "russian" && (
              <CheckIcon className="h-5 w-5 dark:text-blue-600 text-blue-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
