import { TypedWordData } from './TypingArea';

interface WordDisplayProps {
  words: string[];
  currentWordIndex: number;
  typedWord: string;
  typedWords: TypedWordData[];
}

export const WordDisplay = ({
  words,
  currentWordIndex,
  typedWord,
  typedWords,
}: WordDisplayProps) => {
  const getCompletedWordClass = (index: number) => {
    if (index >= typedWords.length) return '';
    return typedWords[index].isCorrect ? 'text-gray-400' : 'text-red-500';
  };

  const renderCurrentWord = (word: string, typedText: string) => {
    return (
      <span className="relative">
        {word.split('').map((char, idx) => {
          const typed = typedText[idx] || '';
          const isCorrect = typed === char;
          return (
            <span
              key={idx}
              className={
                typed
                  ? isCorrect
                    ? 'text-green-500 dark:text-green-600'
                    : 'text-red-500 dark:text-red-600'
                  : ''
              }
            >
              {char}
            </span>
          );
        })}
        {typedText.length > word.length && (
          <span className="text-red-500">{typedText.slice(word.length)}</span>
        )}
        {!typedText.length && (
          <span className="absolute h-5 w-0.5 bg-gray-700 animate-pulse"></span>
        )}
      </span>
    );
  };

  return (
    <div className="mb-8 p-4 bg-gray-800 dark:text-gray-700 dark:bg-gray-300 rounded-lg shadow-md">
      <div className="text-xl font-mono leading-relaxed space-y-1">
        <div className="flex flex-wrap h-[110px] gap-2 overflow-y-auto no-scrollbar">
          {words.map((word, index) => (
            <span
              key={index}
              className={`px-1 h-8 ${
                index === currentWordIndex
                  ? 'bg-gray-700 dark:bg-gray-200 dark:text-gray-800 rounded'
                  : index < currentWordIndex
                  ? getCompletedWordClass(index)
                  : ''
              }`}
            >
              {index === currentWordIndex ? renderCurrentWord(word, typedWord) : word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
