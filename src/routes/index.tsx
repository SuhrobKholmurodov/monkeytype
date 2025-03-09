import { Routes, Route } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import NotFound from '../pages/NotFound'

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default RoutesConfig
