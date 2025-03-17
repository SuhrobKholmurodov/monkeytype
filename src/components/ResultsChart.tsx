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
    name: `Test ${index + 1}`,
    wpm: result.wpm,
    accuracy: result.accuracy,
    time: result.time,
  }));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-200">Your Progress Over Time</h2>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
            <Legend />
            <Line type="monotone" dataKey="wpm" stroke="#3B82F6" name="WPM" />
            <Line type="monotone" dataKey="accuracy" stroke="#10B981" name="Accuracy (%)" />
            <Line type="monotone" dataKey="time" stroke="#EF4444" name="Time (s)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
