import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__code">404</h1>
      <p className="not-found__message">This page doesn't exist — maybe it wandered off the menu.</p>
      <Link to="/" className="not-found__link">Back to Home</Link>
    </div>
  );
};

export default NotFound;