import { Outlet } from 'react-router';
import { NavBar, Footer } from '../components';

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
