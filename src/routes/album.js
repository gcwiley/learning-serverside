import { Router } from 'express';
const router = Router();

// album controller functions
import {
  newAlbum,
  getAlbums,
  getAlbumById,
  updateAlbumById,
  deleteAlbumById,
  getAlbumCount,
  getRecentlyCreatedAlbums,
  searchAlbums,
} from '../controllers/album.js';

// GET /api/albums/count - count all albums
router.get('/count', getAlbumCount);

// GET /api/albums/recent - get recent albums
router.get('/recent', getRecentlyCreatedAlbums);

// GET /api/albums/search - search albums
router.get('/search', searchAlbums);

// GET /api/albums - get all albums
router.get('/', getAlbums);

// GET /api/albums/:id - get album by id
// (must come after specific routes like 'count' or 'recent')
router.get('/:id', getAlbumById);

// POST /api/albums - create new album
router.post('/', newAlbum);

// PATCH /api/albums/:id - update album by id
router.patch('/:id', updateAlbumById);

// DELETE /api/albums/:id - delete album by id
router.delete('/:id', deleteAlbumById);

export { router as albumRouter };
