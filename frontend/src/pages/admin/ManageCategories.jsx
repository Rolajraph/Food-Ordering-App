import { useState, useEffect } from 'react';
import { getCategoriesRequest, createCategoryRequest, deleteCategoryRequest } from '../../api/categoryApi';

const initialFormState = { name: '', image: '' };

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState(initialFormState);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadCategories = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await getCategoriesRequest();
      setCategories(response.data.data.categories);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load categories.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      await createCategoryRequest(formData);
      setFormData(initialFormState);
      await loadCategories();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to create category.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category? Foods referencing it may be affected.')) return;
    try {
      await deleteCategoryRequest(id);
      await loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete category.');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Manage Categories</h1>

      <h2>Add New Category</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="image">Image URL (optional)</label>
          <input id="image" name="image" value={formData.image} onChange={handleChange} />
        </div>
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Category'}
        </button>
      </form>

      <h2>Existing Categories ({categories.length})</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>{cat.name}</td>
              <td>{cat.image ? <img src={cat.image} alt={cat.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} /> : '—'}</td>
              <td>
                <button onClick={() => handleDelete(cat._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategories;