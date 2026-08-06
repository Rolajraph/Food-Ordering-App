import axiosInstance from './axiosInstance';

export const getFoodsRequest = (params) => {
  return axiosInstance.get('/foods', { params });
};

export const getFoodByIdRequest = (id) => {
  return axiosInstance.get(`/foods/${id}`);
};

export const createFoodRequest = (formData) => {
  return axiosInstance.post('/foods', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateFoodRequest = (id, formData) => {
  return axiosInstance.put(`/foods/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteFoodRequest = (id) => {
  return axiosInstance.delete(`/foods/${id}`);
};