import { Router } from 'express';
const router = Router();

// middleware
import { upload } from '../middleware/upload.js';

// image controller functions
import { uploadImage, deleteImage } from '../controllers/image.js';

// POST /api/images/upload
// uses 'upload.single('image') to handle the file parsing before the controller
router.post('/upload', upload.single('image'), uploadImage);

// DELETE /api/images/delete?fileName=uploads/filename.jpg
router.delete('/delete', deleteImage);

export { router as imageRouter };
