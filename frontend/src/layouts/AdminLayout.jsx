import { Link, Outlet } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin</h2>
        <nav>
          <Link to="/admin" className="admin-sidebar__link">Dashboard</Link>
          <Link to="/admin/foods" className="admin-sidebar__link">Manage Foods</Link>
          <Link to="/admin/categories" className="admin-sidebar__link">Manage Categories</Link>
          <Link to="/admin/orders" className="admin-sidebar__link">Manage Orders</Link>
        </nav>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;