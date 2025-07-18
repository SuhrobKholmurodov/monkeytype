import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Confetti from "react-confetti";
import { toast } from "react-toastify";
import { Filter } from "./Filter";
import { Result } from "./Result";
import { WordDisplay } from "./WordDisplay";
import { Language, TestResult } from "~/@types";
import { RestartButton } from "./RestartButton";
import { ResultsSummary } from "./ResultsSummary";
import { LanguageSelector } from "./LanguageSelector";
import { englishWordsArray, russianWordsArray } from "~/constants";
import {
  calculateAccuracy,
  calculateWPM,
  getQuoteSizes,
  updateStreakData,
} from "~/utils";
import { ProgressIndicator } from "./ProgressIndicator";
import HttpsIcon from "@mui/icons-material/Https";

export interface TypedWordData {
  word: string;
  typed: string;
  isCorrect: boolean;
}

export const TypingArea = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [typedWords, setTypedWords] = useState<TypedWordData[]>([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [pastResults, setPastResults] = useState<TestResult[]>(() => {
    const saved = localStorage.getItem("typingTestResults");
    return saved ? JSON.parse(saved) : [];
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeType, setActiveType] = useState<"time" | "words" | "quote">(
    () => {
      const savedType = localStorage.getItem("typingTestType");
      return savedType ? (savedType as "time" | "words" | "quote") : "time";
    }
  );
  const [activeDuration, setActiveDuration] = useState(() => {
    const savedDuration = localStorage.getItem("typingTestDuration");
    return savedDuration ? parseInt(savedDuration) : 15;
  });
  const [activeWordsCount, setActiveWordsCount] = useState(() => {
    const savedWordsCount = localStorage.getItem("typingTestWordsCount");
    return savedWordsCount ? parseInt(savedWordsCount) : 10;
  });
  const [activeQuoteSize, setActiveQuoteSize] = useState<
    "short" | "medium" | "long"
  >(() => {
    const savedQuoteSize = localStorage.getItem("typingTestQuoteSize");
    return savedQuoteSize
      ? (savedQuoteSize as "short" | "medium" | "long")
      : "short";
  });
  const [includeNumbers, setIncludeNumbers] = useState(() => {
    const savedIncludeNumbers = localStorage.getItem(
      "typingTestIncludeNumbers"
    );
    return savedIncludeNumbers ? JSON.parse(savedIncludeNumbers) : false;
  });
  const [quoteWordCount, setQuoteWordCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(activeDuration);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("english");

  const handleToggleNumbers = (include: boolean) => {
    setIncludeNumbers(include);
    localStorage.setItem("typingTestIncludeNumbers", JSON.stringify(include));
    getRandomWords();
  };
  const quoteSizes = getQuoteSizes(selectedLanguage);
  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "typingTestLanguage"
    ) as Language | null;
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    localStorage.setItem("typingTestLanguage", lang);
  };

  useEffect(() => {
    const savedResults = localStorage.getItem("typingTestResults");
    if (savedResults) {
      setPastResults(JSON.parse(savedResults));
    }
    getRandomWords();
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  useHotkeys("capslock", (event) => {
    const isOn = event.getModifierState("CapsLock");
    setCapsLockOn(isOn);
  });

  const formatCompletionTime = (date: Date): string => {
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (finished && startTime && endTime) {
      updateStreakData();
      const newResult = {
        type: activeType === "quote" ? "quote" : activeType,
        language: selectedLanguage,
        duration:
          activeType === "quote"
            ? 0
            : activeType === "time"
            ? activeDuration
            : activeWordsCount,
        wpm: wpm,
        accuracy: accuracy,
        correct: typedWords.filter((w) => w.isCorrect).length,
        incorrect: typedWords.filter((w) => !w.isCorrect).length,
        time: Math.round((endTime.getTime() - startTime.getTime()) / 1000),
        completionTime: formatCompletionTime(new Date()),
        quoteSize: activeType === "quote" ? activeQuoteSize : undefined,
        date: new Date().toLocaleDateString("en-CA", {
          timeZone: "Asia/Dushanbe",
        }),
      };

      const savedResults = localStorage.getItem("typingTestResults");
      const pastResults = savedResults ? JSON.parse(savedResults) : [];
      const updatedResults = [newResult, ...pastResults];
      const previousResultsOfSameType = pastResults.filter(
        (result: TestResult) =>
          result.type === activeType &&
          result.duration ===
            (activeType === "time" ? activeDuration : activeWordsCount)
      );

      if (previousResultsOfSameType.length > 0) {
        const maxWPM = Math.max(
          ...previousResultsOfSameType.map((result: TestResult) => result.wpm)
        );
        if (wpm > maxWPM) {
          setShowConfetti(true);
          toast.success(
            `🎉 You broke your record! Previous: ${maxWPM} WPM, New: ${wpm} WPM`,
            {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
              style: { width: "550px" },
            }
          );
          setTimeout(() => {
            setShowConfetti(false);
          }, 5000);
        }
      }

      if (!localStorage.getItem("lastActiveDate")) {
        const today = new Date().toLocaleDateString("en-CA", {
          timeZone: "Asia/Dushanbe",
        });
        localStorage.setItem("lastActiveDate", today);
        localStorage.setItem("currentStreak", "0");
        localStorage.setItem("maxStreak", "0");
      }

      setPastResults(updatedResults);
      localStorage.setItem("typingTestResults", JSON.stringify(updatedResults));
    }
  }, [finished]);

  useEffect(() => {
    if (activeType === "time" && started && !finished) {
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

  useEffect(() => {
    getRandomWords();
  }, [selectedLanguage]);

  function getRandomWords() {
    if (activeType === "quote") {
      const currentSize = activeQuoteSize || "short";
      const availableQuotes = quoteSizes[currentSize];

      if (!availableQuotes || availableQuotes.length === 0) {
        setWords([]);
        setQuoteWordCount(0);
        return;
      }

      const randomIndex = Math.floor(Math.random() * availableQuotes.length);
      const selectedQuote = availableQuotes[randomIndex];
      const words = selectedQuote.split(" ");

      setWords(words);
      setQuoteWordCount(words.length);
    } else {
      const wordArray =
        selectedLanguage === "english" ? englishWordsArray : russianWordsArray;
      let mixed = wordArray.slice().sort(() => 0.5 - Math.random());

      if (includeNumbers && mixed.length > 1) {
        const firstNumPos = Math.floor(Math.random() * (mixed.length - 1)) + 1;
        let secondNumPos = 0;
        do {
          secondNumPos = Math.floor(Math.random() * (mixed.length - 1)) + 1;
        } while (secondNumPos === firstNumPos);
        mixed = mixed.map((el, index) => {
          if (index === firstNumPos || index === secondNumPos) {
            return Math.floor(Math.random() * 1000).toString();
          }
          if (index !== 0 && Math.random() < 0.25) {
            return Math.floor(Math.random() * 1000).toString();
          }
          return el;
        });
      }

      setWords(mixed.slice(0, activeType === "words" ? activeWordsCount : 100));
      setQuoteWordCount(0);
    }
    setCurrentWordIndex(0);
    setTypedWord("");
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

    if (e.key === "Backspace" && typedWord === "" && currentWordIndex > 0) {
      const previousWord = typedWords[currentWordIndex - 1];
      if (!previousWord.isCorrect) {
        setCurrentWordIndex(currentWordIndex - 1);
        setTypedWord(previousWord.typed);
        setTypedWords(typedWords.slice(0, -1));
      }
      return;
    }

    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (typedWord.trim() !== "") {
        const isCorrect = typedWord === words[currentWordIndex];
        setTypedWords([
          ...typedWords,
          { word: words[currentWordIndex], typed: typedWord, isCorrect },
        ]);

        if (
          (activeType === "words" &&
            currentWordIndex >= activeWordsCount - 1) ||
          (activeType === "quote" && currentWordIndex >= words.length - 1)
        ) {
          setEndTime(new Date());
          setFinished(true);
        } else if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setTypedWord("");
        }
      }
    } else if (e.key === "Backspace") {
      setTypedWord((prev) => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      setTypedWord((prev) => prev + e.key);
    }
  };
  const wpm = calculateWPM(startTime, endTime, typedWords);
  const accuracy = calculateAccuracy(typedWords);

  const handleFilterChange = (
    type: "time" | "words" | "quote",
    value: number | string
  ) => {
    if (type === "time") {
      setActiveType("time");
      setActiveDuration(value as number);
      localStorage.setItem("typingTestType", "time");
      localStorage.setItem("typingTestDuration", value.toString());
      setQuoteWordCount(0);
      getRandomWords();
    } else if (type === "words") {
      setActiveType("words");
      setActiveWordsCount(value as number);
      localStorage.setItem("typingTestType", "words");
      localStorage.setItem("typingTestWordsCount", value.toString());
      setQuoteWordCount(0);
      getRandomWords();
    } else {
      setActiveType("quote");
      const size = (value as "short" | "medium" | "long") || "medium";
      setActiveQuoteSize(size);
      localStorage.setItem("typingTestType", "quote");
      localStorage.setItem("typingTestQuoteSize", size);
      getRandomWords();
    }
  };

  return (
    <div>
      {showConfetti && <Confetti />}
      <div
        className="fixed flex bg-gray-900 dark:bg-gray-200 duration-300 inset-0 flex-col items-center outline-none text-gray-200 overflow-hidden"
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
                quoteSize={activeQuoteSize}
                wordsCount={activeWordsCount}
                onChange={handleFilterChange}
                includeNumbers={includeNumbers}
                onToggleNumbers={handleToggleNumbers}
              />
              {capsLockOn && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-[175px] z-10">
                  <div className="flex gap-3 items-center bg-yellow-400 bg-opacity-90 text-gray-800 px-4 py-3 rounded-md shadow-lg">
                    <HttpsIcon />
                    <span className="font-bold">Caps Lock</span>
                  </div>
                </div>
              )}
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />
              <ProgressIndicator
                activeType={activeType}
                timeLeft={timeLeft}
                currentWordIndex={currentWordIndex}
                activeWordsCount={activeWordsCount}
                quoteWordCount={quoteWordCount}
              />
              <WordDisplay
                words={words}
                currentWordIndex={currentWordIndex}
                typedWord={typedWord}
                typedWords={typedWords}
              />
              <div className="w-full flex items-center justify-center mb-4">
                <RestartButton onRestart={getRandomWords} />
              </div>
              {(!started || finished) && pastResults[0] && (
                <Result title="Last Test's Result" results={[pastResults[0]]} />
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center flex-grow overflow-y-auto p-6">
              <ResultsSummary
                wpm={wpm}
                accuracy={accuracy}
                startTime={startTime}
                endTime={endTime}
              />
              <RestartButton onRestart={getRandomWords} />
              <div className="w-full mt-7">
                <Result
                  title="Detailed Results"
                  results={[
                    {
                      type: activeType === "quote" ? "quote" : activeType,
                      language: selectedLanguage,
                      duration:
                        activeType === "quote"
                          ? 0
                          : activeType === "time"
                          ? activeDuration
                          : activeWordsCount,
                      wpm: wpm,
                      accuracy: accuracy,
                      correct: typedWords.filter((w) => w.isCorrect).length,
                      incorrect: typedWords.filter((w) => !w.isCorrect).length,
                      time:
                        startTime && endTime
                          ? Math.round(
                              (endTime.getTime() - startTime.getTime()) / 1000
                            )
                          : 0,
                      completionTime: formatCompletionTime(new Date()),
                      quoteSize:
                        activeType === "quote" ? activeQuoteSize : undefined,
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
