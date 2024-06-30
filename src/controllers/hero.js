import chalk from 'chalk';
import { Hero } from '../models/hero.js';

// function to create a new hero - NEW HERO
export const newHero = async (req, res) => {
  const hero = new Hero(req.body);

  try {
    // saves new hero to database
    await hero.save();
    res.status(201).send(hero);
  } catch (error) {
    res.status(400).send(error);
    // logs error to console
    console.error('\n', chalk.bold.red(error), '\n');
  }
};

// function to fetch all heroes from database - ALL HEROS
export const getHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find({}).sort({ title: 'desc' });

    // if no heroes are found
    if (!heroes) {
      return res.status(404).send('No hero found.');
    }

    res.send(heroes);
  } catch (error) {
    res.status(500).send();
    // logs error to console
    console.error('\n', chalk.bold.red(error), '\n');
  }
};

// function to fetch individual hero by ID - HERO BY ID
export const getHeroById = async (req, res) => {
  const _id = req.params.id;

  try {
    // filters by _id
    const hero = await Hero.findById({ _id });

    // if no hero is found
    if (!hero) {
      return res.status(404).send('No hero found.');
    }

    res.send(hero);
  } catch (error) {
    res.status(500).send(error);
    // logs error to console
    console.error('\n', chalk.bold.red(error), '\n');
  }
};

// function to update a hero by id - UPDATE HERO
export const updateHeroById = async (req, res) => {
  try {
    const _id = req.params.id;
    const hero = await Hero.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    // is no hero is found
    if (!hero) {
      return res.status(404).send('No hero found.');
    }

    // send updated hero back to client
    res.send(hero);
  } catch (error) {
    // send error to client
    res.status(400).send(error);
  }
};

// function to delete a hero by ID - DELETE HERO
export const deleteHeroById = async (req, res) => {
  try {
    // find and delete hero that takes id into account
    const hero = await Hero.findByIdAndDelete({
      _id: req.params.id,
    });

    // if no hero is found
    if (!hero) {
      res.status(404).send('No hero found.');
    }
    res.send(hero);
  } catch (error) {
    // send error to client
    res.status(500).send(error);
  }
};

// function to count all heroes - HERO COUNT
export const getHeroCount = async (req, res) => {
  try {
    // count all heroes within database
    const heroCount = await Hero.countDocuments({});

    // if no hero count are found
    if (!heroCount) {
      return res.status(404).send('No heroes found');
    }

    res.send(heroCount);
  } catch (error) {
    res.status(500).send(error);
    // if error, log to console
    console.log(error);
  }
};

// function to get the 5 most recently create heroes - RECENT HEROES
export const getRecentlyCreatedHeroes = async (req, res) => {
  try {
    const recentHeroes = await Hero.find({});

    if (!recentHeroes) {
      return res.status(404).send('no recent heroes');
    }
    res.send(recentHeroes);
  } catch (error) {
    res.status(500).send(error);
  }
};
