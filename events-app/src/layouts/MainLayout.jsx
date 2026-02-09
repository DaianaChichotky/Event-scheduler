import { Outlet } from 'react-router';
import { NavBar, Footer } from '../components';

const MainLayout = () => {
  return (
    <div
      className='flex flex-col min-h-screen'
      style={{ backgroundImage: "url('/src/img/bg.png')" }}
    >
      <NavBar />
      <main className='grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
