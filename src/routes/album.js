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

// route handler to count all albums in database
router.get('/api/albums/count', getAlbumCount);

// route handler to get the last 5 albums created
router.get('/api/albums/recent', getRecentlyCreatedAlbums);

// route handler to search all albums
router.get('/api/albums/search', searchAlbums);

// --- GENERAL ROUTES ---

// route handler to create a new album
router.post('/api/albums', newAlbum);

// route handler for fetching all albums
router.get('/api/albums', getAlbums);

// --- PARAMETERIZED ROUTES (Must come LAST) ---

// route handler to fetch individual album by id
router.get('/api/albums/:id', getAlbumById);

// route handler to update an existing album
router.patch('/api/albums/:id', updateAlbumById);

// route handler to delete an album by ID
router.delete('/api/albums/:id', deleteAlbumById);

export { router as albumRouter };
