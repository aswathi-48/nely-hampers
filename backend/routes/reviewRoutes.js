import express from 'express';
const router = express.Router();
import {
  getReviews,
  getAdminReviews,
  createReview,
  approveReview,
  hideReview,
  deleteReview
} from '../controllers/reviewController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/')
  .get(getReviews)
  .post(protect, createReview);

router.get('/admin', protect, admin, getAdminReviews);

router.put('/:id/approve', protect, admin, approveReview);
router.put('/:id/hide', protect, admin, hideReview);

router.route('/:id')
  .delete(protect, admin, deleteReview);

export default router;