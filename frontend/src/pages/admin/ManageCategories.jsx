import { useState, useEffect } from 'react';
import { getCategoriesRequest, createCategoryRequest, deleteCategoryRequest } from '../../api/categoryApi';
import { formatCurrency } from '../../utils/formatCurrency';
import '../../styles/forms.css';
import '../../styles/admin.css';

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
  <div className="admin-page">
    <h1>Manage Categories</h1>

    <h2>Add New Category</h2>
    <form onSubmit={handleCreate} className="admin-form">
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-field">
        <label htmlFor="image">Image URL (optional)</label>
        <input id="image" name="image" value={formData.image} onChange={handleChange} />
      </div>
      {formError && <p className="form-error">{formError}</p>}
      <button type="submit" disabled={isSubmitting} className="form-submit-btn">
        {isSubmitting ? 'Adding...' : 'Add Category'}
      </button>
    </form>

    <h2>Existing Categories ({categories.length})</h2>
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr><th>Name</th><th>Image</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>{cat.name}</td>
              <td>{cat.image ? <img src={cat.image} alt={cat.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} /> : '—'}</td>
              <td><button onClick={() => handleDelete(cat._id)} className="admin-btn admin-btn--danger">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default ManageCategories;