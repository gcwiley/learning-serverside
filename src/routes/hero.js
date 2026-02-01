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

// GET /api/heroes/count - count all heroes
router.get('/count', getHeroCount);

// GET /api/heroes/recent - get recent heroes
router.get('/recent', getRecentlyCreatedHeroes);

// GET /api/heroes/search - search heroes
router.get('/search', searchHeroes);

// GET /api/heroes - get all heroes
router.get('/', getHeroes);

// GET /api/heroes/:id - get heroes by id
// (must come after specific routes like 'count' or 'recent')
router.get('/:id', getHeroById);

// POST /api/heroes - create new hero
router.post('/', newHero);

// PATCH /api/heroes/:id - update hero by id
router.patch('/:id', updateHeroById);

// DELETE /api/heroes/:id - delete hero by id
router.delete('/:id', deleteHeroById);

export { router as heroRouter };
