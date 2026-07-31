import * as orderService from '../services/orderService.js';

export const createOrder = async (req, res) => {
  const order = await orderService.createOrder(req.user.id, req.body);
  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    data: { order },
  });
};

export const getMyOrders = async (req, res) => {
  const orders = await orderService.getMyOrders(req.user.id);
  res.status(200).json({ success: true, results: orders.length, data: { orders } });
};

export const getAllOrders = async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.status(200).json({ success: true, results: orders.length, data: { orders } });
};

export const getOrder = async (req, res) => {
  const order = await orderService.getOrderById(req.params.id, req.user);
  res.status(200).json({ success: true, data: { order } });
};

export const updateOrderStatus = async (req, res) => {
  const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
  res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    data: { order },
  });
};