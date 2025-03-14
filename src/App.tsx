import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import RoutesConfig from './routes'
import { NameModal } from '~/components'

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
      <RoutesConfig />
    </Router>
  )
}

export default App
