import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { createOrderRequest } from "../../api/orderApi";
import { formatCurrency } from '../../utils/formatCurrency';

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    deliveryAddress: "",
    phone: "",
    paymentMethod: "cash_on_delivery",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const orderPayload = {
      items: items.map(({ food, quantity }) => ({ food: food._id, quantity })),
      deliveryAddress: formData.deliveryAddress,
      phone: formData.phone,
      paymentMethod: formData.paymentMethod,
    };

    try {
      const response = await createOrderRequest(orderPayload);
      const order = response.data.data.order;
      clearCart();
      navigate("/order-confirmation", { state: { order } });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to place order. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return <p>Your cart is empty. Add items before checking out.</p>;
  }

  return (
    <div>
      <h1>Checkout</h1>

      <div>
        <h2>Order Summary</h2>
        {items.map(({ food, quantity }) => (
          <p key={food._id}>
            {food.name} × {quantity} — {formatCurrency(food.price * quantity)}
          </p>
        ))}
        <h3>Total: {formatCurrency(subtotal)}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="deliveryAddress">Delivery Address</label>
          <input
            id="deliveryAddress"
            name="deliveryAddress"
            type="text"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="cash_on_delivery">Cash on Delivery</option>
            <option value="card">Card (Simulated)</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
