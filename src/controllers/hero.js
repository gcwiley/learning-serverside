import { Hero } from '../models/hero.js';
import { Op } from 'sequelize';
import { isValidUUID } from '../helpers/validate.js';

// NEW HERO
export const newHero = async (req, res) => {
   try {
      const { name, alterEgo, placeOfOrigin, abilities, biography } = req.body;
      const hero = await Hero.create({
         name,
         alterEgo,
         placeOfOrigin,
         abilities,
         biography,
      });
      res.status(201).json({
         success: true,
         message: 'Successfully created hero in database.',
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

// GET HEROES
export const getHeroes = async (req, res) => {
   try {
      // retrieve all heroes ordered by date (most recent first)
      const heroes = await Hero.findAll({
         order: [['name', 'DESC']], // order heroes by name
      });

      // if no heroes are found
      if (heroes.length === 0) {
         return res.status(200).json({ success: false, message: 'No heroes were found.' });
      }

      // send the list of hereos to the client
      res.status(200).json({
         success: true,
         message: 'Successfully fetched all heroes.',
         data: heroes,
      });
   } catch (error) {
      console.error('Error fetching heroes:', error);
      res.status(500).json({
         success: false,
         message: 'Error fetching heroes.',
         error: error.message,
      });
   }
};

// GET HEROES WITH PAGINATION
export const getHeroesWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: heroes } = await Hero.findAndCountAll({
      order: [['date', 'DESC']],
      limit,
      offset,
    });

    res.status(200).json({
      success: true,
      message: heroes.length ? 'Successfully fetched heroes.' : 'No heroes found.',
      data: heroes,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching heroes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching heroes.',
      error: error.message,
    });
  }
};

// GET HERO BY ID
export const getHeroById = async (req, res) => {
   try {
      const hero = await Hero.findByPk(req.params.id);

      // if no hero is found, handle the empty result
      if (!hero) {
         return res
            .status(404)
            .json({ success: false, message: 'No hero with that ID was found.' });
      }

      res.status(200).json({ success: true, message: 'Successfully fetched hero.', data: hero });
   } catch (error) {
      console.error('Error fetching hero:', error);
      res.status(500).json({
         success: false,
         message: 'Error fetching hero.',
         error: error.message,
      });
   }
};

// UPDATE HERO BY ID
export const updateHeroById = async (req, res) => {
   try {
      const hero = await Hero.findByPk(req.params.id);

      // if no hero is found
      if (!hero) {
         return res.status(404).json({ success: false, message: 'No hero with that ID was found.' });
      }

      const updatedHero = await hero.update({
         name: req.body.name,
         alterEgo: req.body.alterEgo,
         placeOfOrigin: req.body.placeOfOrigin,
         abilities: req.body.abilities,
         biography: req.body.biography,
      });

      res.status(200).json({
         success: true,
         message: 'Successfully updated hero',
         data: updatedHero,
      });
   } catch (error) {
      console.error('Error updating hero.', error);
      res.status(500).json({
         success: false,
         message: 'Error updating hero.',
         error: error.message,
      });
   }
};

// DELETE HERO
export const deleteHeroById = async (req, res) => {
   try {
      const hero = await Hero.findByPk(req.params.id);

      // if no hero is found
      if (!hero) {
         return res
            .status(404)
            .json({ success: false, message: 'No hero with that ID was found.' });
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

// GET HERO COUNT
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

// GET RECENT HEROES
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
      res.status(200).json({
         success: true,
         message: 'Successfully fetched recent heroes.',
         data: recentHeroes,
      });
   } catch (error) {
      console.error('Error fetching recent heroes:', error);
      res.status(500).json({
         success: false,
         message: 'Error fetching recent heroes.',
         error: error.message,
      });
   }
};

// SEARCH HEROES
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
               { placeOfOrigin: { [Op.iLike]: `%${query}%` } },
               { alterEgo: { [Op.iLike]: `%${query}%` } },
            ],
         },
      });

      if (heroes.length === 0) {
         return res
            .status(404)
            .json({ success: false, message: 'No heroes matching your search query were found.' });
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


