import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import Menu from '../pages/public/Menu';
import App from '../App';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;