import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import logo from '../../assets/logo/quickbite-logo.png';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    navigate('/login');
  };

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=C1440E&color=fff&bold=true`;

  
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <img src={logo} alt="QuickBite" className="navbar__logo" />
      </Link>

      <div className="navbar__links">
        <Link to="/menu" className="navbar__link">Menu</Link>
        <Link to="/cart" className="navbar__link navbar__cart">
          Cart
          <span className="navbar__cart-badge">{itemCount}</span>
        </Link>
        {isAuthenticated ? (
          <div className="navbar__profile" ref={dropdownRef}>
            <button
              className="navbar__profile-trigger"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <img src={avatarUrl} alt={user?.name} className="navbar__avatar" />
            </button>
            {isDropdownOpen && (
              <div className="navbar__dropdown">
                <Link
                  to="/orders"
                  className="navbar__dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Orders
                </Link>
                <Link
                  to="/profile"
                  className="navbar__dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="navbar__dropdown-item navbar__dropdown-item--danger"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="navbar__link">Login</Link>
            <Link to="/register" className="navbar__link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;