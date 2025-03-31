// import the hero model
import { Hero } from '../models/hero.js';

// function to create a new hero - NEW HERO
export const newHero = async (req, res) => {
  try {
    // Builds a new model instance and calls save on it.
    await Hero.create({
      name: req.body.name,
      age: req.body.age,
      homePlanet: req.body.homePlanet,
      superPower: req.body.superPower,
      biography: req.body.biography,
    });
    res.status(201).send('Successfully added hero to database');
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

// function to fetch all heroes from database - ALL HEROS
export const getHeroes = async (req, res) => {
  try {
    const heroes = await Hero.findAll({});

    // if no heroes are found
    if (!heroes) {
      return res.status(404).send('No hero found.');
    }

    res.send(heroes);
  } catch (error) {
    res.status(500).send();
    // logs error to console
    console.error(error);
  }
};

// function to fetch individual hero by ID - HERO BY ID
export const getHeroById = async (req, res) => {
  // converts id string to an integer
  const id = req.params.id;

  try {
    const hero = await Hero.findByPk(id);

    // if no hero is found
    if (!hero) {
      return res.status(404).send('No hero found.');
    }

    res.send(hero);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// function to update a hero by id - UPDATE HERO
export const updateHeroById = async (req, res) => {
  // convert string to integer
  const id = parseInt(req.params.id, 10);

  try {
    const hero = await Hero.update(req.body, {
      where: {
        id: id,
      },
    });

    // is no hero is found
    if (!hero) {
      return res.status(404).send('No hero found.');
    }

    // send updated hero back to client
    res.send(hero);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// function to delete a hero by ID - DELETE HERO
export const deleteHeroById = async (req, res) => {
  // convert string to integer
  const id = parseInt(req.params.id, 10);

  try {
    // find and delete hero that takes id into account
    const hero = await Hero.destroy({
      where: {
        id: id,
      },
    });

    // if no hero is found
    if (!hero) {
      res.status(404).send('No hero found.');
    }
    res.send(hero);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// function to count all heroes - HERO COUNT
export const getHeroCount = async (req, res) => {
  try {
    // count all heroes within database
    const heroCount = await Hero.count({});

    // if no hero count are found
    if (!heroCount) {
      return res.status(404).send('Unable to get hero count.');
    }

    res.send(heroCount);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// function to get the 5 most recently create heroes - RECENT HEROES
export const getRecentlyCreatedHeroes = async (req, res) => {
  try {
    const recentHeroes = await Hero.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    if (!recentHeroes) {
      return res.status(404).json('no recent heroes');
    }
    res.send(recentHeroes);
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
};
