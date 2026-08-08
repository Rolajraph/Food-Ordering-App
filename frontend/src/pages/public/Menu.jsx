import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getFoodsRequest } from '../../api/foodApi';
import useCart from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';
import { renderStars } from '../../utils/renderStars';
import './Menu.css';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useCart();

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';

  useEffect(() => {
    const fetchFoods = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await getFoodsRequest({ category, search, sort });
        setFoods(response.data.data.foods);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load menu. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, [category, search, sort]);

  const handleSortChange = (e) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (e.target.value) {
        next.set('sort', e.target.value);
      } else {
        next.delete('sort');
      }
      return next;
    });
  };

  if (isLoading) return <p>Loading menu...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="menu">
      <h1 className="brush-underline">Menu</h1>
      {search && (
        <p style={{ color: 'var(--color-muted)', marginTop: 'var(--space-2)' }}>
          Showing results for "{search}"
        </p>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-4)' }}>
        <select value={sort} onChange={handleSortChange} className="admin-select">
          <option value="">Sort by...</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {foods.length === 0 ? (
        <p>No food items available right now.</p>
      ) : (
        <div className="menu__grid">
          {foods.map((food) => (
            <div className="food-card" key={food._id}>
              <Link to={`/food/${food._id}`}>
                <img src={food.image} alt={food.name} className="food-card__image" />
              </Link>
              <div className="food-card__body">
                <span className="food-card__category">{food.category.name}</span>
                <Link to={`/food/${food._id}`} style={{ color: 'inherit' }}>
                  <h3 className="food-card__name">{food.name}</h3>
                </Link>
                <p className="food-card__description">{food.description}</p>
                <p style={{ color: 'var(--color-primary)', fontSize: 'var(--text-sm)' }}>
                  {renderStars(food.rating)}
                </p>
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