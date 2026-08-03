import axiosInstance from './axiosInstance';

export const registerRequest = (data) => {
  return axiosInstance.post('/auth/register', data);
};

export const loginRequest = (data) => {
  return axiosInstance.post('/auth/login', data);
};

export const getProfileRequest = () => {
  return axiosInstance.get('/auth/profile');
};

export const getUsersRequest = () => {
  return axiosInstance.get('/auth/users');
};