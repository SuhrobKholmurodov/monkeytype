import { TestResult } from '~/@types';
import { Trophy } from 'lucide-react';
import { useLocation } from 'react-router-dom';
interface ResultProps {
  title: string;
  results: TestResult[];
}

export const Result = ({ title, results }: ResultProps) => {
  const location = useLocation();
  if (results.length === 0) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-800 text-gray-200">{title}</h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 dark:bg-gray-300 dark:text-gray-700 text-gray-50">
              <th className="p-3 border border-gray-700 dark:border-gray-400 text-left">Type</th>
              <th className="p-3 border border-gray-700 dark:border-gray-400 text-left">
                Language
              </th>
              <th className="p-3 border border-gray-700 dark:border-gray-400 text-left">WPM</th>
              <th className="p-3 border border-gray-700 dark:border-gray-400 text-left">
                Accuracy
              </th>
              <th className="p-3 border border-gray-700 dark:border-gray-400 text-left">Correct</th>
              <th className="p-3 border border-gray-700 dark:border-gray-400 text-left">
                Incorrect
              </th>
              <th className="p-3 border border-gray-700 dark:border-gray-400 text-left">Time</th>
              <th className="p-3 border border-gray-700 dark:border-gray-400 text-left">
                Completed At
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => {
              const typeAndDur = results.filter(
                (el) => el.type === result.type && el.duration === result.duration,
              );
              const bestRes = typeAndDur.reduce((best, current) => {
                if (current.wpm > best.wpm) {
                  return current;
                } else if (current.wpm === best.wpm) {
                  return current.completionTime > best.completionTime ? current : best;
                }
                return best;
              });
              const isBestCurRes =
                result.wpm === bestRes.wpm && result.completionTime === bestRes.completionTime;

              return (
                <tr
                  key={index}
                  className="text-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 hover:bg-gray-800 transition-colors"
                >
                  <td className="p-3 border border-gray-700 dark:border-gray-400">
                    <div className="flex items-center gap-1">
                      <div className="text-[20px] font-bold">
                        {result.type === 'quote' ? 'Quote' : result.duration}
                      </div>
                      <div className="flex items-center justify-between w-full dark:text-gray-500 text-gray-400">
                        <p className="mt-[3px]">
                          {result.type === 'time'
                            ? 'Seconds'
                            : result.type === 'words'
                              ? 'Words'
                              : `${'| ' + result.quoteSize}` || 'medium'}
                          {result.type !== 'quote' &&
                            ![15, 30, 60, 120].includes(result.duration) &&
                            ![10, 25, 50, 100].includes(result.duration) && (
                              <span className="ml-2 dark:text-yellow-500 text-yellow-400">
                                • Custom
                              </span>
                            )}
                        </p>
                        {isBestCurRes && location.pathname === '/profile' && (
                          <Trophy className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 border border-gray-700 dark:border-gray-400">
                    {result.language === 'english' ? 'English' : 'Russian'}
                  </td>
                  <td className="p-3 border border-gray-700 dark:border-gray-400">{result.wpm}</td>
                  <td className="p-3 border border-gray-700 dark:border-gray-400">
                    {result.accuracy}%
                  </td>
                  <td className="p-3 border border-gray-700 dark:border-gray-400">
                    {result.correct}
                  </td>
                  <td className="p-3 border border-gray-700 dark:border-gray-400">
                    {result.incorrect === 0 ? '-' : result.incorrect}
                  </td>
                  <td className="p-3 border border-gray-700 dark:border-gray-400">
                    {result.time}s
                  </td>
                  <td className="p-3 border border-gray-700 dark:border-gray-400">
                    {result.completionTime}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
