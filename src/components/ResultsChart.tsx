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

interface ResultsChartProps {
  results: TestResult[];
}

export const ResultsChart = ({ results }: ResultsChartProps) => {
  const chartData = results.map((result, index) => ({
    name: `${index + 1}`,
    wpm: result.wpm,
    type: `${result.type} ${result.duration}`,
    accuracy: result.accuracy,
    time: result.time,
    completionTime: result.completionTime,
  }));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-200">Your Progress Over Time</h2>
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
            <Line type="monotone" dataKey="completionTime" stroke="#6D28D9" name="date" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
