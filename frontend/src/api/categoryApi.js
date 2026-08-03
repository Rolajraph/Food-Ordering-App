import axiosInstance from './axiosInstance';

export const getCategoriesRequest = () => {
  return axiosInstance.get('/categories');
};

export const createCategoryRequest = (data) => {
  return axiosInstance.post('/categories', data);
};

export const updateCategoryRequest = (id, data) => {
  return axiosInstance.put(`/categories/${id}`, data);
};

export const deleteCategoryRequest = (id) => {
  return axiosInstance.delete(`/categories/${id}`);
};