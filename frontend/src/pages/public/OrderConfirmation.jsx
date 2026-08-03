import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import './OrderConfirmation.css';


const paymentMethodLabels = {
  cash_on_delivery: 'Cash on Delivery',
  card: 'Card',
  bank_transfer: 'Bank Transfer',
};

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-page__icon">✓</div>
      <h1 className="brush-underline">Order Placed!</h1>
      <p className="confirmation-page__meta">Order ID: {order._id} · Status: {order.status}</p>

      <div className="confirmation-card">
        {order.items.map((item) => (
          <div className="confirmation-card__line" key={item.food}>
            <span>{item.name} × {item.quantity}</span>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="confirmation-card__total">
          <span>Total</span>
          <span>{formatCurrency(order.totalAmount)}</span>
        </div>
        <div className="confirmation-card__details">
          <p>Delivery Address: {order.deliveryAddress}</p>
          <p>Payment Method: {paymentMethodLabels[order.paymentMethod] || order.paymentMethod}</p>
        </div>
      </div>

      <Link to="/menu" className="confirmation-page__link">Continue Shopping</Link>
    </div>
  );
};

export default OrderConfirmation;