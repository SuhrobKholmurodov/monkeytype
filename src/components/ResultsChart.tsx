import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TestResult } from '~/@types';
import { Zap, Target, Clock, Trophy } from 'lucide-react';

interface ResultsChartProps {
  results: TestResult[];
}

export const ResultsChart = ({ results }: ResultsChartProps) => {
  const chartData = results.map((result, index) => {
    const isCustom =
      (result.type === 'time' && ![15, 30, 60, 120].includes(result.duration)) ||
      (result.type === 'words' && ![10, 25, 50, 100].includes(result.duration));

    return {
      name: `${index + 1}`,
      wpm: result.wpm,
      type:
        result.type === 'quote'
          ? `Quote ${result.quoteSize || 'medium'} | ${result.language === 'english' ? 'English' : 'Russian'
          }`
          : `${result.type} ${result.duration}${isCustom ? ' (Custom)' : ''} | ${result.language === 'english' ? 'English' : 'Russian'
          }`,
      accuracy: result.accuracy,
      time: result.time,
      date: result.completionTime,
    };
  });

  const avgWpm = Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length);
  const avgAccuracy = Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length);
  const avgTime = Math.round(results.reduce((sum, r) => sum + r.time, 0) / results.length);
  const bestWpm = Math.max(...results.map(r => r.wpm));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 dark:text-gray-800 text-gray-200">Your Progress Over Time</h2>
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 group overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Avg WPM</div>
            <Zap className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-bold text-blue-400 mt-2 transform group-hover:translate-y-[-2px] transition-transform">{avgWpm}</div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-300 group overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Avg Accuracy</div>
            <Target className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-bold text-green-400 mt-2 transform group-hover:translate-y-[-2px] transition-transform">{avgAccuracy}%</div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 hover:border-red-500 transition-all duration-300 group overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Avg Time</div>
            <Clock className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-bold text-red-400 mt-2 transform group-hover:translate-y-[-2px] transition-transform">{avgTime}s</div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 hover:border-orange-500 transition-all duration-300 group overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Best WPM</div>
            <Trophy className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-bold text-orange-400 mt-2 transform group-hover:translate-y-[-2px] transition-transform">{bestWpm}</div>
        </div>
      </div>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#FA9C1C" tick={{ fill: '#FA9C1C' }} />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
            <Legend />
            <Line type="monotone" dataKey="type" stroke="#FA9C1C" name="type" />
            <Line type="monotone" dataKey="wpm" stroke="#3B82F6" name="wpm" />
            <Line type="monotone" dataKey="accuracy" stroke="#10B981" name="acc" />
            <Line type="monotone" dataKey="time" stroke="#EF4444" name="time" />
            <Line type="monotone" dataKey="date" stroke="#6D28D9" name="date" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};