import React, { useState, useEffect } from 'react';
import { Pencil, UserRound, Flame } from 'lucide-react';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { toast } from 'react-toastify';
import { getJoinDateDifference } from '~/utils';

export const UserTab = () => {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [isEditing, setIsEditing] = useState(false);
  const userJoinDate = localStorage.getItem('userJoinDate');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedCurrentStreak = localStorage.getItem('currentStreak');
      const storedMaxStreak = localStorage.getItem('maxStreak');

      if (storedCurrentStreak) {
        setCurrentStreak(parseInt(storedCurrentStreak));
      }
      if (storedMaxStreak) {
        setMaxStreak(parseInt(storedMaxStreak));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUserName = e.target.value.trim();
    setUserName(newUserName);
    localStorage.setItem('userName', newUserName);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      localStorage.setItem('userName', userName);
      toast.success('Username updated successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div
      id="UserTab"
      className="flex items-start dark:bg-gray-300 justify-between bg-gray-800 p-4 h-[173px] w-[400px] rounded-lg"
    >
      <div className="flex gap-4">
        <div className="p-4 h-[90px] text-gray-200 dark:bg-gray-400 dark:text-gray-800 bg-gray-900 rounded-full">
          <UserRound size={60} />
        </div>

        <div className="flex flex-col">
          {isEditing ? (
            <input
              type="text"
              value={userName}
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
              autoFocus
              className="bg-gray-700 dark:bg-gray-50 text-gray-50 pl-1 dark:text-gray-700 font-[600] w-[180px] text-[30px] rounded-md focus:outline-none"
            />
          ) : (
            <p className="font-[600] dark:text-gray-700 text-gray-50 text-[30px]">
              {userName || 'Your Name'}
            </p>
          )}
          <div className="leading-5 font-medium text-[14px]">
            <Tooltip
              title={
                userJoinDate
                  ? 'Joined ' + getJoinDateDifference(userJoinDate)
                  : 'No join date found'
              }
              slots={{
                transition: Zoom,
              }}
              slotProps={{
                transition: { timeout: 300 },
              }}
              arrow
              placement="right"
              componentsProps={{
                tooltip: {
                  style: {
                    backgroundColor: 'black',
                    color: 'white',
                    fontSize: '14px',
                  },
                },
                arrow: {
                  style: {
                    color: 'black',
                  },
                },
              }}
            >
              <p className="text-gray-500 hover:cursor-pointer">Joined {userJoinDate}</p>
            </Tooltip>
            <Tooltip
              title={
                <span>
                  Longest streak: {maxStreak} {maxStreak > 1 ? 'days' : 'day'}
                  <br />
                  Claimed today:{' '}
                  {localStorage.getItem('lastActiveDate') === new Date().toISOString().split('T')[0]
                    ? 'Yes'
                    : 'No'}
                  <br />
                  <br />
                  Complete tests daily to maintain your streak!
                </span>
              }
              slots={{
                transition: Zoom,
              }}
              slotProps={{
                transition: { timeout: 300 },
              }}
              arrow
              placement="right"
              componentsProps={{
                tooltip: {
                  style: {
                    backgroundColor: 'black',
                    color: 'white',
                    fontSize: '14px',
                  },
                },
                arrow: {
                  style: {
                    color: 'black',
                  },
                },
              }}
            >
              <div className="flex items-center">
                <span className="text-gray-500 hover:cursor-pointer flex items-center">
                  Current streak
                  <Flame size={16} className="text-orange-500 ml-[2px]" />: {currentStreak}{' '}
                  {currentStreak > 1 ? 'days' : 'day'}
                </span>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="text-gray-300 w-6 h-4 dark:text-gray-800 cursor-pointer" onClick={handleEdit}>
        <Tooltip
          title="Edit username"
          placement="right"
          arrow
          componentsProps={{
            tooltip: {
              style: {
                backgroundColor: 'black',
                color: 'white',
                fontSize: '14px',
              },
            },
            arrow: {
              style: {
                color: 'black',
              },
            },
          }}
        >
          <Pencil />
        </Tooltip>
      </div>
    </div>
  );
};
