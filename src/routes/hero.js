import express from 'express';

// create a new router
const router = new express.Router();

import { newHero, getHeroes, deleteHeroById, updateHeroById } from '../controllers/hero.js';

// route handler to create a new hero - NEW HERO
router.post('/api/heroes', newHero);

// route handler for fetching all heroes - GET ALL HEROES
router.get('/api/heroes', getHeroes);

// route handler to update an existing hero - UPDATE HERO BY ID
router.patch('/api/heroes/:id', updateHeroById);

// route handler to delete a hero by Id - DELETE HERO
router.delete('/api/heroes/:id', deleteHeroById);

// export the router to be used
export { router as heroRouter };
