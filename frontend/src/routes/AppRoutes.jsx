import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import Menu from '../pages/public/Menu';
import Cart from '../pages/public/Cart';
import Checkout from '../pages/public/Checkout';
import OrderConfirmation from '../pages/public/OrderConfirmation';
import ManageFoods from '../pages/admin/ManageFoods';
import ManageCategories from '../pages/admin/ManageCategories';
import App from '../App';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<h1>Admin Dashboard (placeholder)</h1>} />
          <Route path="/admin/foods" element={<ManageFoods />} />
          <Route path="/admin/categories" element={<ManageCategories />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;