import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import NameModal from './components/NameModal'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const userName = localStorage.getItem('userName')

  useEffect(() => {
    if (!userName) {
      setIsModalOpen(true)
    }
  }, [userName])

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <Router>
      <ToastContainer />
      <NameModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
