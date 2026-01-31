import { Router } from 'express';
const router = Router();

// hero controller functions
import {
  newHero,
  getHeroes,
  getHeroById,
  deleteHeroById,
  updateHeroById,
  getHeroCount,
  getRecentlyCreatedHeroes,
  searchHeroes,
} from '../controllers/hero.js';

// POST NEW HERO
router.post('/api/heroes', newHero);

// route handler for fetching all herGET ALL HEROES
router.get('/api/heroes', getHeroes);

// route handler to count all heroes in database - COUNT ALL HEROES
router.get('/api/heroes/count', getHeroCount);

// route handler to get the last 5 heroes created - GET 5 RECENT HEROES
router.get('/api/heroes/recent', getRecentlyCreatedHeroes);

// route handler to search heroes - SEARCH HEROES
router.get('/api/heroes/search', searchHeroes);

// route handler to fetch individual hero - GET HERO BY ID
router.get('/api/heroes/:id', getHeroById);

// PATCH /api/heroes/:id - update hero by id
router.patch('/:id', updateHeroById);

// DELETE /api/heroes/:id - delete hero by id
router.delete('/:id', deleteHeroById);

export { router as heroRouter };
