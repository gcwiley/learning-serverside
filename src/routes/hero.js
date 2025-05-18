import express from 'express';

const router = new express.Router();

// hero controller functions
import {
  newHero,
  getHeroes,
  getHeroById,
  deleteHeroById,
  updateHeroById,
  getHeroCount,
  getRecentlyCreatedHeroes,
} from '../controllers/hero.js';

// route handler to create a new hero - POST NEW HERO
router.post('/api/heroes', newHero);

// route handler for fetching all heroes - GET ALL HEROES
router.get('/api/heroes', getHeroes);

// route handler to fetch individual hero - GET HERO BY ID
router.get('/api/heroes/:id', getHeroById);

// route handler to update an existing hero - UPDATE HERO BY ID
router.patch('/api/heroes/:id', updateHeroById);

// route handler to delete a hero by Id - DELETE HERO
router.delete('/api/heroes/:id', deleteHeroById);

// router handler to count all heroes in database - COUNT ALL HEROES
router.get('/api/heroes/count', getHeroCount);

// router handler to get the last 5 heroes created - GET 5 RECENT HEROES
router.get('/api/heroes/recent', getRecentlyCreatedHeroes);

// export the router to be used
export { router as heroRouter };
