import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NameModal from './components/NameModal'

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
      <NameModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
