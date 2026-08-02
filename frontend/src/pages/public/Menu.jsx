import { useState, useEffect } from 'react';
import { getFoodsRequest } from '../../api/foodApi';
import useCart from '../../hooks/useCart';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    const fetchFoods = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await getFoodsRequest();
        setFoods(response.data.data.foods);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load menu. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (isLoading) return <p>Loading menu...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Menu</h1>
      {foods.length === 0 ? (
        <p>No food items available right now.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {foods.map((food) => (
            <div key={food._id} style={{ border: '1px solid #e5e5e5', padding: '1rem', borderRadius: '4px' }}>
              <img src={food.image} alt={food.name} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <p>${food.price.toFixed(2)}</p>
              <p style={{ fontSize: '0.85rem', color: '#666' }}>{food.category.name}</p>
              {!food.isAvailable && <p style={{ color: 'red' }}>Currently unavailable</p>}
              <button onClick={() => addItem(food)} disabled={!food.isAvailable}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;