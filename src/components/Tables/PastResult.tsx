import { TestResult } from '~/components';

interface PastResultProps {
  pastResults: TestResult[];
}

export const PastResult = ({ pastResults }: PastResultProps) => {
  return (
    <div className="mt-5">
      <h1 className="text-2xl font-bold mb-6 text-gray-200">Your Results Table</h1>
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
            {pastResults.map((el, index) => (
              <tr key={index} className="text-gray-200 hover:bg-gray-800 transition-colors">
                <td className="p-3 border border-gray-700">
                  <div className="flex items-center gap-1">
                    <div className=" text-[20px] font-bold">{el.duration}</div>
                    <div className="text-gray-400">{el.type === 'time' ? 'Seconds' : 'Words'}</div>
                  </div>
                </td>
                <td className="p-3 border border-gray-700">{el.wpm}</td>
                <td className="p-3 border border-gray-700">{el.accuracy}%</td>
                <td className="p-3 border border-gray-700">{el.correct}</td>
                <td className="p-3 border border-gray-700">
                  {el.incorrect === 0 ? '-' : el.incorrect}
                </td>
                <td className="p-3 border border-gray-700">{el.time}s</td>
                <td className="p-3 border border-gray-700">{el.completionTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
