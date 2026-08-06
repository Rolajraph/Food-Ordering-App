import axiosInstance from './axiosInstance';

export const getCategoriesRequest = () => {
  return axiosInstance.get('/categories');
};

export const createCategoryRequest = (formData) => {
  return axiosInstance.post('/categories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateCategoryRequest = (id, formData) => {
  return axiosInstance.put(`/categories/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteCategoryRequest = (id) => {
  return axiosInstance.delete(`/categories/${id}`);
};