import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { NotificationButton } from './NotificationButton';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <NotificationButton />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;