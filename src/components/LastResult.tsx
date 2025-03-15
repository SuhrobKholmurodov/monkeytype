import { TestResult } from './TypingArea';

interface LastTestResultProps {
  lastResult: TestResult | undefined;
}

export const LastTestResult = ({ lastResult }: LastTestResultProps) => {
  if (!lastResult) return null;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-300">Last Test Result</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-3 border border-gray-700 text-left">Type</th>
            <th className="p-3 border border-gray-700 text-left">WPM</th>
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
                <div className="text-[20px] font-bold">{lastResult.duration}</div>
                <div className="text-gray-400">
                  {lastResult.type === 'time' ? 'Seconds' : 'Words'}
                </div>
              </div>
            </td>
            <td className="p-3 border border-gray-700">{lastResult.wpm}</td>
            <td className="p-3 border border-gray-700">{lastResult.accuracy}%</td>
            <td className="p-3 border border-gray-700">{lastResult.correct}</td>
            <td className="p-3 border border-gray-700">
              {lastResult.incorrect === 0 ? '-' : lastResult.incorrect}
            </td>
            <td className="p-3 border border-gray-700">{lastResult.time} sec</td>
            <td className="p-3 border border-gray-700">{lastResult.completionTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
