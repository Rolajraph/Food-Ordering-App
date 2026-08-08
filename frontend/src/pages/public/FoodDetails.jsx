import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFoodByIdRequest } from '../../api/foodApi';
import useCart from '../../hooks/useCart';
import useToast from '../../hooks/useToast';
import { formatCurrency } from '../../utils/formatCurrency';
import { renderStars } from '../../utils/renderStars';
import './FoodDetails.css';

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchFood = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await getFoodByIdRequest(id);
        setFood(response.data.data.food);
      } catch (err) {
        setError(err.response?.data?.message || 'Food item not found.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  const handleAddToCart = () => {
    addItem(food, quantity);
    showToast(`${food.name} added to cart`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return (
    <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
      <p>{error}</p>
      <Link to="/menu">Back to Menu</Link>
    </div>
  );

  return (
    <div className="food-details">
      <img src={food.image} alt={food.name} className="food-details__image" />
      <div>
        <span className="food-details__category">{food.category.name}</span>
        <h1>{food.name}</h1>
        <p className="food-details__rating">{renderStars(food.rating)} ({food.rating.toFixed(1)})</p>
        <p className="food-details__description">{food.description}</p>
        <p className="food-details__price">{formatCurrency(food.price)}</p>

        {!food.isAvailable ? (
          <p className="food-details__unavailable">Currently unavailable</p>
        ) : (
          <>
            <div className="food-details__qty">
              <button className="food-details__qty-btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button className="food-details__qty-btn" onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
            <button onClick={handleAddToCart} className="food-card__btn">Add to Cart</button>
          </>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;