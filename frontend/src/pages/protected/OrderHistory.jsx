import { useState, useEffect } from 'react';
import { getMyOrdersRequest } from '../../api/orderApi';
import { formatCurrency } from '../../utils/formatCurrency';
import '../../styles/admin.css';

const statusColors = {
  pending: 'admin-badge--unavailable',
  preparing: 'admin-badge--unavailable',
  on_the_way: 'admin-badge--unavailable',
  delivered: 'admin-badge--available',
  cancelled: 'admin-badge--unavailable',
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await getMyOrdersRequest();
        setOrders(response.data.data.orders);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load your orders.');
      } finally {
        setIsLoading(false);
      }
    };
    loadOrders();
  }, []);

  if (isLoading) return <p>Loading your orders...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="admin-page">
      <h1 className="brush-underline">My Orders</h1>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.items.map((item) => (
                    <div key={item.food}>{item.name} × {item.quantity}</div>
                  ))}</td>
                  <td>{formatCurrency(order.totalAmount)}</td>
                  <td><span className={`admin-badge ${statusColors[order.status]}`}>{order.status}</span></td>
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

export default OrderHistory;