import { Router } from 'express';
const router = Router();

// image controller function (implement these in src/controller/image)
import {
  newImage,
  getImages,
  getImageById,
  deleteImageById,
  updateImageById,
  searchImages,
} from '../controllers/image.js';

// POST: create a new image (multipart/form-data expected)
router.post('/api/images', newImage);

// GET: all images
router.get('/api/images', getImages);

// GET: search images (e.g., /api/images/search?query=foo)
router.get('/api/images/search', searchImages);

// GET: single image by id
router.get('/api/images/:id', getImageById);

// PATCH: update image metadata
router.patch('/api/images/:id', updateImageById);

// DELETE: delete image by id
router.delete('/api/images/:id', deleteImageById);

export { router as imageRouter };