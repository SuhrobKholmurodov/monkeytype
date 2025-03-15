import { calculateAccuracy, calculateWPM } from '~/utils/Typing';
import { TypedWordData } from '../TypingArea';

interface CurrentResultProps {
  activeType: 'time' | 'words';
  activeDuration: number;
  activeWordsCount: number;
  typedWords: TypedWordData[];
  startTime: Date | null;
  endTime: Date | null;
}

export const CurrentResult = ({
  activeType,
  activeDuration,
  activeWordsCount,
  typedWords,
  startTime,
  endTime,
}: CurrentResultProps) => {
  const wpm = calculateWPM(startTime, endTime, typedWords);
  const accuracy = calculateAccuracy(typedWords);

  return (
    <div className="mt-12 w-full">
      <h3 className="text-xl font-bold mb-4 text-gray-300">Detailed Results</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-3 border border-gray-700 text-left">Type</th>
            <th className="p-3 flex items-center gap-4 border border-gray-700 text-left">
              <p>WPM</p>
            </th>
            <th className="p-3 border border-gray-700 text-left">Accuracy</th>
            <th className="p-3 border border-gray-700 text-left">Correct Words</th>
            <th className="p-3 border border-gray-700 text-left">Incorrect Words</th>
            <th className="p-3 border border-gray-700 text-left">Total Time</th>
            <th className="p-3 border border-gray-700 text-left">Completed At</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border border-gray-700">
              <div className="flex items-center gap-1">
                <div className="text-[20px] font-bold">
                  {activeType === 'time' ? activeDuration : activeWordsCount}
                </div>
                <div className="text-gray-400">{activeType === 'time' ? 'Seconds' : 'Words'}</div>
              </div>
            </td>
            <td className="p-3 border border-gray-700">{wpm}</td>
            <td className="p-3 border border-gray-700">{accuracy}%</td>
            <td className="p-3 border border-gray-700">
              {typedWords.filter((w) => w.isCorrect).length}
            </td>
            <td className="p-3 border border-gray-700">
              {typedWords.filter((w) => !w.isCorrect).length === 0
                ? '-'
                : typedWords.filter((w) => !w.isCorrect).length}
            </td>
            <td className="p-3 border border-gray-700">
              {startTime && endTime
                ? Math.round((endTime.getTime() - startTime.getTime()) / 1000)
                : 0}{' '}
              sec
            </td>
            <td className="p-3 border border-gray-700">
              {new Date().toLocaleString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
