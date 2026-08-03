import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';
import './Cart.css';

const Cart = () => {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="brush-underline">Your Cart</h1>
        <div className="cart-page__empty">
          <p>Your cart is empty.</p>
          <Link to="/menu">Browse the menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="brush-underline">Your Cart</h1>
      <div>
        {items.map(({ food, quantity }) => (
          <div className="cart-item" key={food._id}>
            <img src={food.image} alt={food.name} className="cart-item__image" />
            <div className="cart-item__info">
              <p className="cart-item__name">{food.name}</p>
              <p className="cart-item__unit-price">{formatCurrency(food.price)} each</p>
            </div>
            <div className="cart-item__qty">
              <button className="cart-item__qty-btn" onClick={() => updateQuantity(food._id, quantity - 1)}>-</button>
              <span>{quantity}</span>
              <button className="cart-item__qty-btn" onClick={() => updateQuantity(food._id, quantity + 1)}>+</button>
            </div>
            <p className="cart-item__line-total">{formatCurrency(food.price * quantity)}</p>
            <button className="cart-item__remove" onClick={() => removeItem(food._id)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="cart-page__summary">
        <h2 className="cart-page__subtotal">Subtotal: {formatCurrency(subtotal)}</h2>
        <Link to="/checkout">
          <button className="cart-page__checkout-btn">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;