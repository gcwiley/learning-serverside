// this is an example of a controller that uses sequelize to read/write to a SQL database

import chalk from 'chalk';

import { Album } from '../models/album.js';

// function to create a new album - NEW ALBUM
export const newAlbum = async (req, res) => {
  try {
    // Builds a new model instance and calls save on it.
    await Album.create({
      title: req.body.title,
      artist: req.body.artist,
      releaseDate: req.body.releaseDate,
      label: req.body.label,
      studio: req.body.studio,
      genre: req.body.genre,
      summary: req.body.summary,
    });
    res.status(201).send('Successfully added album to database');
    console.log(chalk.green('Successfully added album to the database!'));
  } catch (error) {
    res.status(400).send(error);
    // if error, log error to console
    console.error(error);
  }
};

// function to fetch all albums from database - ALL ALBUMS
export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll({
      order: [['updatedAt', 'DESC']],
    });

    // if no albums are found
    if (!albums) {
      return res.status(404).send('No Albums found');
    }

    res.send(albums);
  } catch (error) {
    res.status(500).send(error);
    // if error, log to console
    console.error(error);
  }
};

// function to fetch invidual album by id = ALBUM BY ID
export const getAlbumById = async (req, res) => {
  // converts id string to an integer
  const id = parseInt(req.params.id);

  try {
    const album = await Album.findByPk(id);

    // if album is not found
    if (!album) {
      return res.status(404).send('Album not found');
    }

    res.send(album);
  } catch (error) {
    res.status(500).send(error);
    // if error, log to console
    console.error(error);
  }
};

// function to update a album by id - UPDATE ALBUM
export const updateAlbumById = async (req, res) => {
  // convert string to integer
  const id = parseInt(req.params.id);

  try {
    const album = await Album.update(req.body, {
      where: {
        id: id,
      },
    });

    // if no album is found
    if (!album) {
      res.status(404).send('No Album found.');
    }

    res.send(album);
  } catch (error) {
    res.status(500).send(error);
    // if error, log to console
    console.error(error);
  }
};

// function to delete album by id - DELETE ALBUM
export const deleteAlbumById = async (req, res) => {
  // convert string to integer
  const id = parseInt(req.params.id);

  try {
    const album = await Album.destroy({
      where: {
        id: id,
      },
    });

    // if no album is found
    if (!album) {
      res.status(404).send('No Album found');
    }

    res.status(201).send('Successfullly deleted album.');
  } catch (error) {
    res.status(500).send(error);
    // if error, log to console
    console.error(error);
  }
};

// function to count all albums in database - ALBUM COUNT
export const getAlbumCount = async (req, res) => {
  try {
    const albumCount = await Album.count({});

    // if unable to get album count
    if (!albumCount) {
      res.status(404).send('Unable to get album count.');
    }

    res.send(albumCount);
  } catch (error) {
    res.status(500).send(error);
    // log error to console
    console.error(error);
  }
};

// function to get the 5 most recently created albums - RECENT ALBUMS
export const getRecentlyCreatedAlbums = async (req, res) => {
  try {
    // finds most 10 recent albums and sorts by 'createdAt' in descending order
    const recentAlbums = await Album.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    if (!recentAlbums) {
      return res.status(404).send('No albums found.');
    }

    res.send(recentAlbums);
  } catch (error) {
    res.status(500).send(error);
    // if error, log to console
    console.error(error);
  }
};
