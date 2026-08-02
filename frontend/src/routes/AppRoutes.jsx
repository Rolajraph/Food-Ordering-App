import { Routes, Route } from 'react-router-dom';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import App from '../App';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;