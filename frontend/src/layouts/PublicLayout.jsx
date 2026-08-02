import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const PublicLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;