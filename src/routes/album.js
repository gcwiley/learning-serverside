import { Router } from 'express';

const router = new Router();

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

// route handler to create a new album - NEW ALBUM
router.post('/api/albums', newAlbum);

// route handler for fetching all albums - GET ALL ALBUMS
router.get('/api/albums', getAlbums);

// route handler to count all albums in database - COUNT ALL ALBUMS
router.get('/api/albums/count', getAlbumCount);

// route handler to get the last 5 albums created - GET 5 RECENT ALBUMS
router.get('/api/albums/recent', getRecentlyCreatedAlbums);

// route handler to search all albums - SEARCH ALBUMS
router.get('/api/heroes/search', searchAlbums);

// route handler to fetch individual album by ID
router.get('/api/albums/:id', getAlbumById);

// route handler to update an existing album - UPDATE ALBUM
router.patch('/api/albums/:id', updateAlbumById);

// route handler to delete an album by ID - DELETE ALBUM
router.delete('/api/albums/:id', deleteAlbumById);

export { router as albumRouter };
