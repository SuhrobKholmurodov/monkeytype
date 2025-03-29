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
    <div className="mt-5">
      <h1 className="text-2xl font-bold mb-6 text-gray-200">{title}</h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-gray-50">
              <th className="p-3 border border-gray-700 text-left">Type</th>
              <th className="p-3 border border-gray-700 text-left">WPM</th>
              <th className="p-3 border border-gray-700 text-left">Accuracy</th>
              <th className="p-3 border border-gray-700 text-left">Correct</th>
              <th className="p-3 border border-gray-700 text-left">Incorrect</th>
              <th className="p-3 border border-gray-700 text-left">Time</th>
              <th className="p-3 border border-gray-700 text-left">Completed At</th>
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
                result.wpm === bestRes.wpm &&
                result.completionTime === bestRes.completionTime;

              return (
                <tr key={index} className="text-gray-200 hover:bg-gray-800 transition-colors">
                  <td className="p-3 border border-gray-700">
                    <div className="flex items-center gap-1">
                      <div className="text-[20px] font-bold">{result.duration}</div>
                      <div className="flex items-center justify-between w-full text-gray-400">
                        <p>{result.type === 'time' ? 'Seconds' : 'Words'}</p>
                        <p>
                          {isBestCurRes && location.pathname === '/profile' && (
                            <Trophy className="w-4 h-4 text-yellow-400" />
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 border border-gray-700">{result.wpm}</td>
                  <td className="p-3 border border-gray-700">{result.accuracy}%</td>
                  <td className="p-3 border border-gray-700">{result.correct}</td>
                  <td className="p-3 border border-gray-700">
                    {result.incorrect === 0 ? '-' : result.incorrect}
                  </td>
                  <td className="p-3 border border-gray-700">{result.time}s</td>
                  <td className="p-3 border border-gray-700">{result.completionTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
