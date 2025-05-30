import { Hero } from '../models/hero.js';
import { Op } from 'sequelize';

// function to create a new hero - NEW HERO
export const newHero = async (req, res) => {
   try {
      // builds a new model instance and calls save on it.
      const hero = await Hero.create({
         name: req.body.name,
         age: req.body.age,
         dateOfBirth: new Date(req.body.dateOfBirth),
         homePlanet: req.body.homePlanet,
         superPower: req.body.superPower,
         biography: req.body.biography,
      });
      res.status(201).json({
         success: true,
         message: 'Successfully added hero to database',
         data: hero,
      });
   } catch (error) {
      console.error('Error creating hero:', error);
      res.status(400).json({
         success: false,
         message: 'Error creating hero.',
         error: error.message,
      });
   }
};

// function to fetch all heroes from database - GET ALL HEROES
export const getHeroes = async (req, res) => {
   try {
      // retrieve all heroes ordered by date (most recent first)
      const heroes = await Hero.findAll({
         order: [['dateOfBirth', 'DESC']], // order heroes by date of birth
      });

      // if no heroes are found
      if (heroes.length === 0) {
         return res.status(404).json({ message: 'No heroes found.' });
      }

      // send the list of hereos to the client
      res.status(200).json(heroes);
   } catch (error) {
      console.error('Error fetching heroes:', error);
      res.status(500).json({
         success: false,
         message: 'Error fetching heroes.',
         error: error.message,
      });
   }
};

// function to fetch individual hero by ID - HERO BY ID
export const getHeroById = async (req, res) => {
   try {
      const hero = await Hero.findByPk(req.params.id);

      // if no hero is found, handle the empty result
      if (!hero) {
         return res
            .status(404)
            .json({ success: false, message: 'No hero with that ID was found.' });
      }

      res.status(200).json(hero);
   } catch (error) {
      console.error('Error fetching hero:', error);
      res.status(500).json({
         success: false,
         message: 'Error fetching hero.',
         error: error.message,
      });
   }
};

// function to update a hero by id - UPDATE HERO BY ID
export const updateHeroById = async (req, res) => {
   try {
      const hero = await Hero.findByPk(req.params.id);

      // if no hero is found
      if (!hero) {
         return res.status(404).json({ message: 'No hero with that ID was found.' });
      }

      const updatedHero = await hero.update({
         name: req.body.name,
         age: req.body.age,
         dateOfBirth: new Date(req.body.dateOfBirth),
         homePlanet: req.body.homePlanet,
         superPower: req.body.superPower,
         biography: req.body.biography,
      });

      res.status(200).json(updatedHero);
   } catch (error) {
      console.error('Error updating hero.', error);
      res.status(500).json({
         success: false,
         message: 'Error updating hero.',
         error: error.message,
      });
   }
};

// function to delete a hero by ID - DELETE HERO
export const deleteHeroById = async (req, res) => {
   try {
      const hero = await Hero.findByPk(req.params.id);

      // if no hero is found
      if (!hero) {
         res.status(404).json({ success: false, message: 'No hero with that ID was found.' });
      }

      await hero.destroy();
      res.status(200).json({ success: true, message: 'Hero deleted successfully.' });
   } catch (error) {
      console.error('Error deleting hero:', error);
      res.status(500).json({
         success: false,
         message: 'Error deleting hero.',
         error: error.message,
      });
   }
};

// function to count all heroes - GET HERO COUNT
export const getHeroCount = async (req, res) => {
   try {
      const heroCount = await Hero.count({});

      // send hero count to client
      res.status(200).json({
         success: true,
         message: 'Successfully fetched hero count.',
         data: heroCount,
      });
   } catch (error) {
      console.error('Error fetching hero count:', error);
      res.status(500).json({
         success: false,
         message: 'Error fetching hero count.',
         error: error.message,
      });
   }
};

// function to get the 5 most recently create heroes - GET RECENT HEROES
export const getRecentlyCreatedHeroes = async (req, res) => {
   try {
      const recentHeroes = await Hero.findAll({
         order: [['createdAt', 'DESC']],
         limit: 10,
      });

      if (recentHeroes.length === 0) {
         return res.status(404).json('no recent heroes');
      }
      // send recently created heroes to client
      res.status(200).json({ success: true, message: 'Successfully fetched recent heroes.', data: recentHeroes});
   } catch (error) {
      console.error('Error fetching recent heroes:', error);
      res.status(500).json({
         success: false,
         message: 'Error fetching recent heroes.',
         error: error.message,
      });
   }
};

// function to search for albums by title, artist, or genre - SEARCH HEROES
export const searchHeroes = async (req, res) => {
   const { query } = req.query;

   // validate query parameters
   if (!query) {
      return res
         .status(400)
         .json({ success: false, message: 'Query parameter is required for searching heroes.' });
   }

   try {
      const heroes = await Hero.findAll({
         where: {
            // uses the Op.or operator to search for albums that match any of the search criteria.
            [Op.or]: [
               // uses the 'Op.iLike' operator for case-insensitive search
               { name: { [Op.iLike]: `%${query}%` } },
               { homePlanet: { [Op.iLike]: `%${query}%` } },
               { age: { [Op.iLike]: `%${query}%` } },
            ],
         },
      });

      if (heroes.length === 0) {
         return res
            .status(404)
            .json({ success: false, message: 'No heroes found matching your search query.' });
      }

      res.status(200).json({ success: true, message: 'Hero search results.', data: heroes });
   } catch (error) {
      console.error('Error searching heroes:', error);
      res.status(500).json({
         success: false,
         message: 'Error searching heroes.',
         error: error.message,
      });
   }
};
