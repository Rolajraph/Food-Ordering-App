import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '200px', borderRight: '1px solid #e5e5e5', padding: '1rem' }}>
        <h2>Admin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/foods">Manage Foods</Link>
          <Link to="/admin/categories">Manage Categories</Link>
          <Link to="/admin/orders">Manage Orders</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;