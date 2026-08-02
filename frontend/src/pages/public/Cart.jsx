import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const Cart = () => {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/menu">Browse the menu</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <div>
        {items.map(({ food, quantity }) => (
          <div
            key={food._id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              borderBottom: '1px solid #e5e5e5',
              padding: '1rem 0',
            }}
          >
            <img src={food.image} alt={food.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <h3>{food.name}</h3>
              <p>${food.price.toFixed(2)} each</p>
            </div>
            <div>
              <button onClick={() => updateQuantity(food._id, quantity - 1)}>-</button>
              <span style={{ margin: '0 0.5rem' }}>{quantity}</span>
              <button onClick={() => updateQuantity(food._id, quantity + 1)}>+</button>
            </div>
            <p>${(food.price * quantity).toFixed(2)}</p>
            <button onClick={() => removeItem(food._id)}>Remove</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem', textAlign: 'right' }}>
        <h2>Subtotal: ${subtotal.toFixed(2)}</h2>
        <Link to="/checkout">
          <button>Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;