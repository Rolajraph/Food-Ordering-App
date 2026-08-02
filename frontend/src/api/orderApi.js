import axiosInstance from './axiosInstance';

export const createOrderRequest = (data) => {
  return axiosInstance.post('/orders', data);
};

export const getMyOrdersRequest = () => {
  return axiosInstance.get('/orders/my-orders');
};

export const getOrderByIdRequest = (id) => {
  return axiosInstance.get(`/orders/${id}`);
};