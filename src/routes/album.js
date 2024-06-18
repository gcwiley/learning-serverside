import { Router } from 'express';

// create a new router
const router = new Router();

// import the album controller functions
import {
  newAlbum,
  getAlbums,
  getAlbumById,
  updateAlbumById,
  deleteAlbumById,
  getAlbumCount,
  getRecentlyCreatedHeroes,
} from '../controllers/album.js';

// route handler to create a new album - NEW ALBUM
router.post('/api/albums', newAlbum);

// route handler for fetching all albums - GET ALL ALBUMS
router.get('/api/albums', getAlbums);

// route handler to fetch individual albums by ID
router.get('/api/albums/:id', getAlbumById);

// route handle to update an existing album - UPDATE ALBUM
router.patch('/api/albums/:id', updateAlbumById);

// route handle to delete an album by ID - DELETE ALBUM
router.delete('/api/albums/:id', deleteAlbumById);

// router hanlder to count all albums in database - COUNT ALL ALBUMS
router.get('/api/album-count', getAlbumCount);

// route handler to get the last 5 albums created - GET 5 RECENT ALBUMS
router.get('/api/recent-albums', getRecentlyCreatedHeroes);

// export the router
export { router as albumRouter };
