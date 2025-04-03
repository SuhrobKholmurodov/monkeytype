import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RoutesConfig from './routes';
import { NameModal } from '~/components';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const handleNameSet = () => {
    setUserName(localStorage.getItem('userName') || '');
  };

  useEffect(() => {
    if (!userName) {
      setIsModalOpen(true);
    }
  }, [userName]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      <ToastContainer />
      <NameModal isOpen={isModalOpen} onClose={handleCloseModal} onNameSet={handleNameSet} />
      <RoutesConfig />
    </Router>
  );
};

export default App;
