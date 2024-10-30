import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              My PWA App
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-gray-600">Home</Link>
            <Link to="/profile" className="hover:text-gray-600">Profile</Link>
            <Link to="/settings" className="hover:text-gray-600">Settings</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;