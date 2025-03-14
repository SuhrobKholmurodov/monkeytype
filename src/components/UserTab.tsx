import React, { useState, useEffect } from 'react';
import { Pencil, UserRound } from 'lucide-react';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { toast } from 'react-toastify';
import { getJoinDateDifference } from '~/utils/Profile';

export const UserTab = () => {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [isEditing, setIsEditing] = useState(false);
  const userJoinDate = localStorage.getItem('userJoinDate');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
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
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <div id="UserTab" className="flex mt-[70px] justify-between gap-4 bg-gray-800 p-4 rounded-lg">
      <div className="flex gap-4">
        <div className="p-5 text-gray-200 bg-gray-900 rounded-full">
          <UserRound size={30} />
        </div>
        <div className="flex flex-col">
          {isEditing ? (
            <input
              type="text"
              value={userName}
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
              autoFocus
              className="bg-gray-700 text-gray-50 font-[600] mt-[-2px] text-[24px] rounded-md pr-[3px] pt-[3px] pl-[2px] pb-[3px] focus:outline-none"
            />
          ) : (
            <p className="font-[600] text-gray-50 text-[24px]">{userName || 'Your Name'}</p>
          )}
          <Tooltip
            title={
              userJoinDate ? 'Joined ' + getJoinDateDifference(userJoinDate) : 'No join date found'
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
        </div>
      </div>
      <div className="text-gray-300 cursor-pointer" onClick={handleEdit}>
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
