import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">Food Ordering App</Link>

      <div className="navbar__links">
        <Link to="/menu" className="navbar__link">Menu</Link>
        <Link to="/cart" className="navbar__link navbar__cart">
          Cart
          <span className="navbar__cart-badge">{itemCount}</span>
        </Link>
        {isAuthenticated ? (
          <>
            <span className="navbar__greeting">Hi, {user.name}</span>
            <button onClick={handleLogout} className="navbar__logout-btn">Logout</button>
          </>
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