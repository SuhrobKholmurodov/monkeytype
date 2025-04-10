import { GlobeIcon } from 'lucide-react';
import { useState } from 'react';
import { Language } from '~/@types';
import { LanguageModal } from './LanguageModal';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector = ({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex hover:text-gray-400 w-fit mx-auto duration-300 font-bold hover:dark:text-gray-600 hover:cursor-pointer dark:text-gray-900 items-center justify-center gap-3"
      >
        <GlobeIcon className="h-5 w-5" />
        <p>{selectedLanguage === 'english' ? 'English' : 'Russian'}</p>
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
