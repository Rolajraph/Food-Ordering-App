import * as authService from '../services/authService.js';

export const register = async (req, res) => {
  const { user, token } = await authService.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    data: { user, token },
  });
};

export const login = async (req, res) => {
  const { user, token } = await authService.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: { user, token },
  });
};

export const getProfile = async (req, res) => {
  const user = await authService.getUserProfile(req.user.id);

  res.status(200).json({
    success: true,
    data: { user },
  });
};