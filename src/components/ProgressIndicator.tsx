import { formatTimeLeft } from '~/utils'; 

interface ProgressIndicatorProps {
  activeType: 'time' | 'words' | 'quote';
  timeLeft: number;
  currentWordIndex: number;
  activeWordsCount: number;
  quoteWordCount: number;
}

export const ProgressIndicator = ({
  activeType,
  timeLeft,
  currentWordIndex,
  activeWordsCount,
  quoteWordCount,
}: ProgressIndicatorProps) => (
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center gap-4">
      <div className="text-3xl text-[#e2b714] font-[600]">
        {activeType === 'time'
          ? formatTimeLeft(timeLeft) 
          : activeType === 'words'
          ? `${currentWordIndex + 1}/${activeWordsCount}`
          : `${currentWordIndex + 1}/${quoteWordCount}`}
      </div>
    </div>
  </div>
);