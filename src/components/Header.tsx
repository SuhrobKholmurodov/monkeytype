import { UserRound, Github, LogOut, Globe, Settings, Keyboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import { NameModal } from './NameModal';
import { Switcher } from './Switcher';

export const Header = () => {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleNameSet = () => {
    setUserName(localStorage.getItem('userName') || '');
  };

  useEffect(() => {
    if (!localStorage.getItem('userName')) {
      setIsModalOpen(true);
    }
  }, []);

  useEffect(() => {
    const currentName = localStorage.getItem('userName') || '';
    if (currentName !== userName) {
      setUserName(currentName);
    }
    if (!currentName) {
      setIsModalOpen(true);
    }
  }, [userName]);

  const handleSignOut = () => {
    localStorage.clear();
    setUserName('');
    navigate('/');
    setIsModalOpen(true);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white py-4 px-[70px] flex justify-between items-center shadow-md z-50">
      <div className="flex flex-col items-start">
        <Link to={'/'} className="text-lg font-bold">
          Monkey Type
        </Link>
        <Tooltip
          title="Move to the official website"
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
          <div>
            {' '}
            <a className="flex gap-1 items-center" target="_blank" href="https://monkeytype.com/">
              <p className="font-bold text-[14px]">Inspired by:</p>
              <Keyboard className="text-[#e2b714]" />
            </a>
          </div>
        </Tooltip>
      </div>
      <div className="flex gap-6 items-center">
        <Tooltip
          slots={{
            transition: Zoom,
          }}
          title={
            <div className="flex flex-col">
              <div className="flex rounded-t-[12px] hover:bg-gray-700 hover:duration-300 px-3 py-[10px] hover:text-[#e2b714] hover:cursor-pointer items-center gap-2">
                <Settings size={18} />
                <p className="font-bold">Account settings</p>
              </div>
              <div>
              <Switcher />
              </div>
              <Link
                to={'/profile'}
                className="flex hover:bg-gray-700 hover:duration-300 px-3 py-[10px] hover:text-[#e2b714] hover:cursor-pointer items-center gap-2"
              >
                <Globe size={18} />
                <p className="font-bold">Public profile</p>
              </Link>

              <div>
                <a
                  href="https://github.com/SuhrobKholmurodov/monkeytype"
                  target="_blank"
                  className="flex hover:bg-gray-700 hover:duration-300 px-3 py-[10px] hover:text-[#e2b714] hover:cursor-pointer gap-2"
                >
                  <Github size={18} />
                  <p className="font-bold">Source code</p>
                </a>
              </div>
              <div
                onClick={handleSignOut}
                className="flex border-t border-gray-400 rounded-b-[12px] hover:bg-gray-700 hover:duration-300 px-3 py-[10px] hover:text-[#e2b714] hover:cursor-pointer items-center gap-2"
              >
                <LogOut size={18} />
                <p className="font-bold">Sign out</p>
              </div>
            </div>
          }
          componentsProps={{
            tooltip: {
              style: {
                backgroundColor: '#1f2937',
                border: '6px solid #111827',
                padding: '0px',
                borderRadius: '15px',
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
          <div>
            <Link to={'/profile'} className="flex items-center gap-1">
              <UserRound size={24} />
              {userName && <p>{userName}</p>}
            </Link>{' '}
          </div>
        </Tooltip>
      </div>
      <NameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNameSet={handleNameSet}
      />
    </header>
  );
};
