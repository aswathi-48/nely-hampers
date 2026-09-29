import express from 'express';
const router = express.Router();
import {
  getMedia,
  getAdminMedia,
  createMedia,
  updateMedia,
  deleteMedia
} from '../controllers/mediaController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/')
  .get(getMedia)
  .post(protect, admin, createMedia);

router.get('/admin', protect, admin, getAdminMedia);

router.route('/:id')
  .put(protect, admin, updateMedia)
  .delete(protect, admin, deleteMedia);

export default router;