import express from 'express';
const router = express.Router();
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/')
  .post(createOrder) // Allow public creation for now, frontend will attach token if logged in
  .get(protect, admin, getOrders);

router.route('/:id')
  .get(protect, getOrderById); // Protect will need logic to ensure user owns order or is admin

router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

export default router;