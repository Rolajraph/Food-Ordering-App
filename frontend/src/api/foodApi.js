import axiosInstance from './axiosInstance';

export const getFoodsRequest = (params) => {
  return axiosInstance.get('/foods', { params });
};

export const getFoodByIdRequest = (id) => {
  return axiosInstance.get(`/foods/${id}`);
};