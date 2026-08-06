import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFoodsRequest } from '../../api/foodApi';
import useCart from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';
import './Menu.css';

const Menu = () => {
  const [searchParams] = useSearchParams();
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useCart();

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const fetchFoods = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await getFoodsRequest({ category, search });
        setFoods(response.data.data.foods);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load menu. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, [category, search]);

  if (isLoading) return <p>Loading menu...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="menu">
      <h1 className="brush-underline">Menu</h1>
      {search && <p style={{ color: 'var(--color-muted)', marginTop: 'var(--space-2)' }}>Showing results for "{search}"</p>}
      {foods.length === 0 ? (
        <p>No food items available right now.</p>
      ) : (
        <div className="menu__grid">
          {foods.map((food) => (
            <div className="food-card" key={food._id}>
              <img src={food.image} alt={food.name} className="food-card__image" />
              <div className="food-card__body">
                <span className="food-card__category">{food.category.name}</span>
                <h3 className="food-card__name">{food.name}</h3>
                <p className="food-card__description">{food.description}</p>
                <p className="food-card__price">{formatCurrency(food.price)}</p>
                {!food.isAvailable && <p className="food-card__unavailable">Currently unavailable</p>}
                <button
                  onClick={() => addItem(food)}
                  disabled={!food.isAvailable}
                  className="food-card__btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;