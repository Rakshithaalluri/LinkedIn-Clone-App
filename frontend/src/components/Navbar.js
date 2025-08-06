import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';
import './navbar.css';

function Navbar({ user, setUser }) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = "/login";
  };

  if (!user) return null; // hide navbar for non-logged users

  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/feed" className={location.pathname === '/feed' ? 'active' : ''}>
          <FaHome /> Feed
        </Link>
        <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
          <FaUser /> Profile
        </Link>
      </div>
      <div className="nav-right">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
