import { Outlet } from 'react-router-dom';
import { Header } from '~/components';

export const Layout = () => {
  return (
    <div>
      <Header />
      <main style={{ marginTop: '60px' }}>
        <Outlet />
      </main>
    </div>
  );
};
