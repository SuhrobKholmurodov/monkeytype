import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { RotateCw } from 'lucide-react';
import { wordsArray } from '~/constants';
import { Filter } from './Filter';
import { calculateAccuracy, calculateWPM } from '~/utils/Typing';
import { Result } from './Result';
export interface TypedWordData {
  word: string;
  typed: string;
  isCorrect: boolean;
}

export interface TestResult {
  type: 'time' | 'words';
  duration: number;
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  time: number;
  completionTime: string;
}

export const TypingArea = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWord, setTypedWord] = useState('');
  const [typedWords, setTypedWords] = useState<TypedWordData[]>([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [pastResults, setPastResults] = useState<TestResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeType, setActiveType] = useState<'time' | 'words'>('time');
  const [activeDuration, setActiveDuration] = useState(15);
  const [activeWordsCount, setActiveWordsCount] = useState(10);
  const [timeLeft, setTimeLeft] = useState(activeDuration);

  useEffect(() => {
    const savedResults = localStorage.getItem('typingTestResults');
    if (savedResults) {
      setPastResults(JSON.parse(savedResults));
    }
    getRandomWords();
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const formatCompletionTime = (date: Date): string => {
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  useEffect(() => {
    if (finished && startTime && endTime) {
      const newResult: TestResult = {
        type: activeType,
        duration: activeType === 'time' ? activeDuration : activeWordsCount,
        wpm: wpm,
        accuracy: accuracy,
        correct: typedWords.filter((w) => w.isCorrect).length,
        incorrect: typedWords.filter((w) => !w.isCorrect).length,
        time: Math.round((endTime.getTime() - startTime.getTime()) / 1000),
        completionTime: formatCompletionTime(new Date()),
      };

      const savedResults = localStorage.getItem('typingTestResults');
      const pastResults = savedResults ? JSON.parse(savedResults) : [];
      const updatedResults = [newResult, ...pastResults];
      setPastResults(updatedResults);
      localStorage.setItem('typingTestResults', JSON.stringify(updatedResults));
    }
  }, [finished]);

  useEffect(() => {
    if (activeType === 'time' && started && !finished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setEndTime(new Date());
            setFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [activeType, started, finished]);

  function getRandomWords() {
    const mixed = [...wordsArray].sort(() => 0.5 - Math.random());
    setWords(mixed.slice(0, activeType === 'words' ? activeWordsCount : 100));
    setCurrentWordIndex(0);
    setTypedWord('');
    setTypedWords([]);
    setStarted(false);
    setFinished(false);
    setStartTime(null);
    setEndTime(null);
    setTimeLeft(activeDuration);
  }

  useEffect(() => {
    getRandomWords();
  }, [activeDuration, activeType, activeWordsCount]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (finished) return;

    if (!started) {
      setStarted(true);
      setStartTime(new Date());
    }

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (typedWord.trim() !== '') {
        const isCorrect = typedWord === words[currentWordIndex];
        setTypedWords([
          ...typedWords,
          { word: words[currentWordIndex], typed: typedWord, isCorrect },
        ]);

        if (activeType === 'words' && currentWordIndex >= activeWordsCount - 1) {
          setEndTime(new Date());
          setFinished(true);
        } else if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setTypedWord('');
        }
      }
    } else if (e.key === 'Backspace') {
      setTypedWord((prev) => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      setTypedWord((prev) => prev + e.key);
    }
  };

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
              className={typed ? (isCorrect ? 'text-green-500' : 'text-red-500') : ''}
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

  const wpm = calculateWPM(startTime, endTime, typedWords);
  const accuracy = calculateAccuracy(typedWords);

  const handleFilterChange = (type: 'time' | 'words', value: number) => {
    if (type === 'time') {
      setActiveType('time');
      setActiveDuration(value);
    } else {
      setActiveType('words');
      setActiveWordsCount(value);
    }
  };

  return (
    <div>
      <div
        className="fixed flex bg-gray-900 inset-0 flex-col items-center outline-none text-gray-200 overflow-hidden"
        tabIndex={0}
        style={{ margin: 0, padding: 0 }}
        onKeyDown={handleKeyDown}
        ref={containerRef}
        onClick={() => {
          if (containerRef.current) containerRef.current.focus();
        }}
      >
        <div className="w-full max-w-7xl mt-[90px] h-full flex flex-col justify-between overflow-hidden">
          {!finished ? (
            <div className="flex flex-col flex-grow overflow-y-auto p-6">
              <Filter
                type={activeType}
                duration={activeDuration}
                wordsCount={activeWordsCount}
                onChange={handleFilterChange}
              />
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <div className="text-3xl text-[#e2b714] font-[600]">
                    {activeType === 'time'
                      ? timeLeft
                      : currentWordIndex + 1 + '/' + activeWordsCount}
                  </div>
                </div>
              </div>
              <div className="mb-8 p-4 bg-gray-800 rounded-lg shadow-md">
                <div className="text-xl font-mono leading-relaxed space-y-1">
                  <div
                    className="flex flex-wrap h-[110px] gap-2 overflow-y-auto no-scrollbar"
                    ref={(el) => {
                      if (el && currentWordIndex >= 0) {
                        const currentWordElement = el.children[currentWordIndex] as HTMLElement;
                        if (currentWordElement) {
                          el.scrollTo({
                            top: currentWordElement.offsetTop - el.offsetTop,
                            behavior: 'smooth',
                          });
                        }
                      }
                    }}
                  >
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className={`px-1 h-8 ${
                          index === currentWordIndex
                            ? 'bg-gray-700 rounded'
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

              <div className="w-full flex items-center justify-center mb-4">
                <button
                  onClick={getRandomWords}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md transition-colors duration-200"
                >
                  <RotateCw size={16} />
                  Restart Test
                </button>
              </div>
              {(!started || finished) && pastResults[0] && (
                <Result title="Last Test Result" results={[pastResults[0]]} />
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center flex-grow overflow-y-auto p-6">
              <div className="flex gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-500">{wpm}</div>
                  <div className="text-sm text-gray-400">WPM</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-500">{accuracy}%</div>
                  <div className="text-sm text-gray-400">Accuracy</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-500">
                    {startTime && endTime
                      ? Math.round((endTime.getTime() - startTime.getTime()) / 1000)
                      : 0}
                  </div>
                  <div className="text-sm text-gray-400">Seconds</div>
                </div>
              </div>

              <button
                onClick={getRandomWords}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md transition-colors duration-200"
              >
                <RotateCw size={16} />
                Restart Test
              </button>
              <div className="w-full">
                <Result
                  title="Detailed Results"
                  results={[
                    {
                      type: activeType,
                      duration: activeType === 'time' ? activeDuration : activeWordsCount,
                      wpm: wpm,
                      accuracy: accuracy,
                      correct: typedWords.filter((w) => w.isCorrect).length,
                      incorrect: typedWords.filter((w) => !w.isCorrect).length,
                      time:
                        startTime && endTime
                          ? Math.round((endTime.getTime() - startTime.getTime()) / 1000)
                          : 0,
                      completionTime: formatCompletionTime(new Date()),
                    },
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
