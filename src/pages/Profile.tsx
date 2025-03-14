import { useState, useEffect } from 'react';
import { MaxScores, MetaTags, PastResultTable, TestResult, UserTab } from '~/components';

export const Profile = () => {
  const [pastResults, setPastResults] = useState<TestResult[]>([]);

  useEffect(() => {
    const savedResults = localStorage.getItem('typingTestResults');
    if (savedResults) {
      setPastResults(JSON.parse(savedResults));
    }
  }, []);

  return (
    <div className="p-6 overflow-y-scroll fixed inset-0 bg-gray-900">
      <MetaTags
        title="Account | Monkeytype"
        description="Manage your Monkeytype account. View your typing test history, update your profile, and track your progress."
        keywords="Monkeytype account, typing test history, profile settings, typing progress, typing statistics"
      />
      <UserTab />
      <MaxScores pastResults={pastResults} />
      {pastResults.length > 0 ? (
        <PastResultTable pastResults={pastResults} />
      ) : (
        <p className="text-gray-400">
          No past results found. Complete a typing test to see your results here!
        </p>
      )}
    </div>
  );
};
