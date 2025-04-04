import { useState, useEffect } from 'react';
import { TestResult } from '~/@types';
import { MaxScores, MetaTags, Result, UserTab, ResultsChart } from '~/components';

export const Profile = () => {
  const [pastResults, setPastResults] = useState<TestResult[]>([]);

  useEffect(() => {
    const savedResults = localStorage.getItem('typingTestResults');
    if (savedResults) {
      setPastResults(JSON.parse(savedResults));
    }
  }, []);

  return (
    <div className="py-6 px-[70px] overflow-y-scroll fixed inset-0 dark:bg-gray-200 bg-gray-900">
      <MetaTags
        title="Account | Monkeytype"
        description="Manage your Monkeytype account. View your typing test history, update your profile, and track your progress."
        keywords="Monkeytype account, typing test history, profile settings, typing progress, typing statistics"
      />
      <div className="mt-[85px] gap-[20px] flex items-center justify-between">
        <UserTab />
        <MaxScores pastResults={pastResults} />
      </div>
      {pastResults.length > 0 ? (
        <>
          <ResultsChart results={pastResults} />
          <div className='mt-5'>
            <Result title="Your Results Table" results={pastResults} />
          </div>
        </>
      ) : (
        <p className="text-gray-200 text-[25px] text-center mt-[70px]">
          No past results found. Complete a typing test to see your results here!
        </p>
      )}
    </div>
  );
};
