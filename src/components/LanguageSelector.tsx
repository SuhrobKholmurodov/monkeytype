import { ChevronDown, GlobeIcon } from "lucide-react";
import { useState } from "react";
import { Language } from "~/@types";
import { LanguageModal } from "./LanguageModal";

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector = ({
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case "english":
        return "English";
      case "russian":
        return "Russian";
      case "german":
        return "German";
      default:
        return "Select Language";
    }
  };
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-3 mx-auto font-bold duration-300 hover:text-gray-400 w-fit hover:dark:text-gray-600 hover:cursor-pointer dark:text-gray-900"
      >
        <GlobeIcon className="w-5 h-5" />
        <p>{getLanguageLabel(selectedLanguage)}</p>
        <ChevronDown className="w-4 h-4" />
      </div>
      <LanguageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
      />
    </>
  );
};
