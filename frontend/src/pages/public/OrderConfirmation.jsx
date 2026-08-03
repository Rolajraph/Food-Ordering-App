import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Order Placed Successfully!</h1>
      <p>Order ID: {order._id}</p>
      <p>Status: {order.status}</p>
      <h2>Items</h2>
      {order.items.map((item) => (
        <p key={item.food}>
          {item.name} × {item.quantity} — {formatCurrency(item.price * item.quantity)}
        </p>
      ))}
      <h3>Total: {formatCurrency(order.totalAmount)}</h3>
      <p>Delivery Address: {order.deliveryAddress}</p>
      <p>Payment Method: {order.paymentMethod}</p>
      <Link to="/menu">Continue Shopping</Link>
    </div>
  );
};

export default OrderConfirmation;