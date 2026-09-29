import express from 'express';
const router = express.Router();
import { registerCustomer, loginCustomer, loginAdmin, getUserProfile, getAllUsers } from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/register', registerCustomer);
router.post('/login', loginCustomer);
router.post('/admin-login', loginAdmin);
router.get('/me', protect, getUserProfile);
router.get('/users', protect, admin, getAllUsers);

export default router;