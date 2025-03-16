import { TestResult } from "~/@types";

interface ResultProps {
  title: string;
  results: TestResult[]; 
}

export const Result = ({ title, results }: ResultProps) => {
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
            {results.map((result, index) => (
              <tr key={index} className="text-gray-200 hover:bg-gray-800 transition-colors">
                <td className="p-3 border border-gray-700">
                  <div className="flex items-center gap-1">
                    <div className="text-[20px] font-bold">{result.duration}</div>
                    <div className="text-gray-400">
                      {result.type === 'time' ? 'Seconds' : 'Words'}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};