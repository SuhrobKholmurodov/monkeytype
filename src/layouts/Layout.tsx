import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Layout = () => {
  return (
    <div>
      <Header />
      <main style={{ marginTop: '60px', padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
