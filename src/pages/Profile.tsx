import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { MaxScores, PastResultTable, TestResult, UserTab } from '~/components';

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
      <Helmet>
        <title>Account | Monkeytype</title>
        <meta
          name="description"
          content="Manage your Monkeytype account. View your typing test history, update your profile, and track your progress."
        />
        <meta
          name="keywords"
          content="Monkeytype account, typing test history, profile settings, typing progress, typing statistics"
        />
      </Helmet>

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
