interface ResultsSummaryProps {
  wpm: number;
  accuracy: number;
  startTime?: Date | null;
  endTime?: Date | null;
}

export const ResultsSummary = ({ wpm, accuracy, startTime, endTime }: ResultsSummaryProps) => (
  <div className="flex gap-8 mb-8">
    <div className="text-center">
      <div className="text-4xl font-bold text-green-500">{wpm}</div>
      <div className="text-sm text-gray-400">WPM</div>
    </div>
    <div className="text-center">
      <div className="text-4xl font-bold text-blue-500">{accuracy}%</div>
      <div className="text-sm text-gray-400">Accuracy</div>
    </div>
    <div className="text-center">
      <div className="text-4xl font-bold text-purple-500">
        {startTime && endTime ? Math.round((endTime.getTime() - startTime.getTime()) / 1000) : 0}
      </div>
      <div className="text-sm text-gray-400">Seconds</div>
    </div>
  </div>
);
