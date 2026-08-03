import axiosInstance from './axiosInstance';

export const getFoodsRequest = (params) => {
  return axiosInstance.get('/foods', { params });
};

export const getFoodByIdRequest = (id) => {
  return axiosInstance.get(`/foods/${id}`);
};

export const createFoodRequest = (data) => {
  return axiosInstance.post('/foods', data);
};

export const updateFoodRequest = (id, data) => {
  return axiosInstance.put(`/foods/${id}`, data);
};

export const deleteFoodRequest = (id) => {
  return axiosInstance.delete(`/foods/${id}`);
};