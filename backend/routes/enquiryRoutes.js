import express from 'express';
const router = express.Router();
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus
} from '../controllers/enquiryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/')
  .post(createEnquiry)
  .get(protect, admin, getEnquiries);

router.route('/:id')
  .get(protect, admin, getEnquiryById);

router.route('/:id/status')
  .put(protect, admin, updateEnquiryStatus);

export default router;