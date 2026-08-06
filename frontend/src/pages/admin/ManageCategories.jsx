import { useState, useEffect } from 'react';
import { getCategoriesRequest, createCategoryRequest, updateCategoryRequest, deleteCategoryRequest } from '../../api/categoryApi';
import '../../styles/forms.css';
import '../../styles/admin.css';

const initialFormState = { name: '' };

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState(initialFormState);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
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

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const startEdit = (category) => {
    setEditingId(category._id);
    setFormData({ name: category.name });
    setImageFile(null);
    setFormError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setImageFile(null);
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    const submitData = new FormData();
    submitData.append('name', formData.name);
    if (imageFile) {
      submitData.append('image', imageFile);
    }

    try {
      if (editingId) {
        await updateCategoryRequest(editingId, submitData);
      } else {
        await createCategoryRequest(submitData);
      }
      cancelEdit();
      await loadCategories();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save category.');
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

      <h2>{editingId ? 'Edit Category' : 'Add New Category'}</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label htmlFor="image">Image {editingId && '(leave blank to keep current)'}</label>
          <input id="image" name="image" type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {formError && <p className="form-error">{formError}</p>}
        <button type="submit" disabled={isSubmitting} className="form-submit-btn">
          {isSubmitting ? 'Saving...' : editingId ? 'Update Category' : 'Add Category'}
        </button>
        {editingId && (
          <button type="button" onClick={cancelEdit} className="admin-btn">
            Cancel
          </button>
        )}
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
                <td>
                  <button onClick={() => startEdit(cat)} className="admin-btn">Edit</button>{' '}
                  <button onClick={() => handleDelete(cat._id)} className="admin-btn admin-btn--danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCategories;