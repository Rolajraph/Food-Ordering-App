import { useState, useEffect } from 'react';
import { getAllOrdersRequest } from '../../api/orderApi';
import { getFoodsRequest } from '../../api/foodApi';
import { getUsersRequest } from '../../api/authApi';
import { formatCurrency } from '../../utils/formatCurrency';
import '../../styles/admin.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true);
      setError('');
      try {
        const [ordersRes, foodsRes, usersRes] = await Promise.all([
          getAllOrdersRequest(),
          getFoodsRequest(),
          getUsersRequest(),
        ]);

        const orders = ordersRes.data.data.orders;
        const foods = foodsRes.data.data.foods;
        const users = usersRes.data.data.users;

        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const totalCustomers = users.filter((u) => u.role === 'customer').length;

        setStats({
          totalOrders: orders.length,
          totalRevenue,
          totalCustomers,
          totalFoods: foods.length,
        });

        // Orders are already sorted newest-first by the backend
        setRecentOrders(orders.slice(0, 5));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
  <div className="admin-page">
    <h1>Dashboard</h1>
    <div className="admin-stats">
      <div className="admin-stat-card">
        <h3>Total Orders</h3>
        <p>{stats.totalOrders}</p>
      </div>
      <div className="admin-stat-card">
        <h3>Total Revenue</h3>
        <p>{formatCurrency(stats.totalRevenue)}</p>
      </div>
      <div className="admin-stat-card">
        <h3>Total Customers</h3>
        <p>{stats.totalCustomers}</p>
      </div>
      <div className="admin-stat-card">
        <h3>Total Foods</h3>
        <p>{stats.totalFoods}</p>
      </div>
    </div>

    <h2>Recent Orders</h2>
    {recentOrders.length === 0 ? (
      <p>No orders yet.</p>
    ) : (
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.customer.name}</td>
                <td>{formatCurrency(order.totalAmount)}</td>
                <td><span className="admin-badge admin-badge--available">{order.status}</span></td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
 );
};

export default Dashboard;