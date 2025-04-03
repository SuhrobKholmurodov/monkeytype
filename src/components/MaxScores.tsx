import { TestResult } from '~/@types';
import { ScoreTooltip } from '~/components';
import { getMaxWPMAndAccuracy } from '~/utils/Profile';

interface MaxScoresProps {
  pastResults: TestResult[];
}

export const MaxScores = ({ pastResults }: MaxScoresProps) => {
  const max15Seconds = getMaxWPMAndAccuracy(pastResults, 15, 'time');
  const max30Seconds = getMaxWPMAndAccuracy(pastResults, 30, 'time');
  const max60Seconds = getMaxWPMAndAccuracy(pastResults, 60, 'time');
  const max120Seconds = getMaxWPMAndAccuracy(pastResults, 120, 'time');
  const max10Words = getMaxWPMAndAccuracy(pastResults, 10, 'words');
  const max25Words = getMaxWPMAndAccuracy(pastResults, 25, 'words');
  const max50Words = getMaxWPMAndAccuracy(pastResults, 50, 'words');
  const max100Words = getMaxWPMAndAccuracy(pastResults, 100, 'words');

  return (
    <div className="flex justify-between gap-[20px]">
      <div
        id="maxScoreBySeconds"
        className="flex justify-between text-center text-gray-200 gap-[80px] bg-gray-800 p-4 rounded-lg"
      >
        {max15Seconds.maxWPM > 0 && max15Seconds.accuracy > 0 ? (
          <ScoreTooltip
            maxWPM={max15Seconds.maxWPM}
            accuracy={max15Seconds.accuracy}
            completedAt={max15Seconds.completedAt}
            label="15 seconds"
          />
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-500">15 seconds</p>
            <p className="text-[40px] font-[500]">-</p>
            <p className="text-gray-400 text-[22px]">-</p>
          </div>
        )}
        {max30Seconds.maxWPM > 0 && max30Seconds.accuracy > 0 ? (
          <ScoreTooltip
            maxWPM={max30Seconds.maxWPM}
            accuracy={max30Seconds.accuracy}
            completedAt={max30Seconds.completedAt}
            label="30 seconds"
          />
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-500">30 seconds</p>
            <p className="text-[40px] font-[500]">-</p>
            <p className="text-gray-400 text-[22px]">-</p>
          </div>
        )}
        {max60Seconds.maxWPM > 0 && max60Seconds.accuracy > 0 ? (
          <ScoreTooltip
            maxWPM={max60Seconds.maxWPM}
            accuracy={max60Seconds.accuracy}
            completedAt={max60Seconds.completedAt}
            label="60 seconds"
          />
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-500">60 seconds</p>
            <p className="text-[40px] font-[500]">-</p>
            <p className="text-gray-400 text-[22px]">-</p>
          </div>
        )}
        {max120Seconds.maxWPM > 0 && max120Seconds.accuracy > 0 ? (
          <ScoreTooltip
            maxWPM={max120Seconds.maxWPM}
            accuracy={max120Seconds.accuracy}
            completedAt={max120Seconds.completedAt}
            label="120 seconds"
          />
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-500">120 seconds</p>
            <p className="text-[40px] font-[500]">-</p>
            <p className="text-gray-400 text-[22px]">-</p>
          </div>
        )}
      </div>
      <div
        id="maxsScoreByWords"
        className="flex justify-between text-center text-white gap-[80px] bg-gray-800 p-4 rounded-lg"
      >
        {max10Words.maxWPM > 0 && max10Words.accuracy > 0 ? (
          <ScoreTooltip
            maxWPM={max10Words.maxWPM}
            accuracy={max10Words.accuracy}
            completedAt={max10Words.completedAt}
            label="10 words"
          />
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-500">10 words</p>
            <p className="text-[40px] font-[500]">-</p>
            <p className="text-gray-400 text-[22px]">-</p>
          </div>
        )}
        {max25Words.maxWPM > 0 && max25Words.accuracy > 0 ? (
          <ScoreTooltip
            maxWPM={max25Words.maxWPM}
            accuracy={max25Words.accuracy}
            completedAt={max25Words.completedAt}
            label="25 words"
          />
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-500">25 words</p>
            <p className="text-[40px] font-[500]">-</p>
            <p className="text-gray-400 text-[22px]">-</p>
          </div>
        )}
        {max50Words.maxWPM > 0 && max50Words.accuracy > 0 ? (
          <ScoreTooltip
            maxWPM={max50Words.maxWPM}
            accuracy={max50Words.accuracy}
            completedAt={max50Words.completedAt}
            label="50 words"
          />
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-500">50 words</p>
            <p className="text-[40px] font-[500]">-</p>
            <p className="text-gray-400 text-[22px]">-</p>
          </div>
        )}
        {max100Words.maxWPM > 0 && max100Words.accuracy > 0 ? (
          <ScoreTooltip
            maxWPM={max100Words.maxWPM}
            accuracy={max100Words.accuracy}
            completedAt={max100Words.completedAt}
            label="100 words"
          />
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-500">100 words</p>
            <p className="text-[40px] font-[500]">-</p>
            <p className="text-gray-400 text-[22px]">-</p>
          </div>
        )}
      </div>
    </div>
  );
};
