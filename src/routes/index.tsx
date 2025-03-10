import { Routes, Route } from 'react-router-dom'
import { Layout } from '~/layouts'
import { Home, NotFound, Profile } from '~/pages'

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
