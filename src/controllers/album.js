// this is an example of a controller that uses sequelize to read/write to a SQL database
import { Album } from '../models/album.js';

// Function to create a new album - NEW ALBUM
export const newAlbum = async (req, res) => {
   try {
      // Builds a new model instance and calls save on it.
      const album = await Album.create({
         title: req.body.title,
         artist: req.body.artist,
         releaseDate: new Date(req.body.releaseDate),
         label: req.body.label,
         studio: req.body.studio,
         genre: req.body.genre,
         summary: req.body.summary,
      });
      res.status(201).json({ message: 'Successfully added album to database', album: album });
   } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error creating album', error: error.message });
   }
};

// Function to fetch all albums from database - ALL ALBUMS
export const getAlbums = async (req, res) => {
   try {
      const albums = await Album.findAll({
         order: [['updatedAt', 'DESC']],
      });

      // if no albums are found
      if (albums.length === 0) {
         return res.status(404).json({ message: 'No albums found' });
      }

      res.status(200).json(albums);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching albums', error: error.message });
   }
};

// Function to fetch invidual album by id - ALBUM BY ID
export const getAlbumById = async (req, res) => {
   // converts id string to an integer
   const id = parseInt(req.params.id, 10);

   try {
      const album = await Album.findByPk(id);

      // if album is not found
      if (!album) {
         return res.status(404).json({ message: 'Album not found' });
      }

      res.status(200).json(album);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching album', error: error.message });
   }
};

// function to update a album by id - UPDATE ALBUM
export const updateAlbumById = async (req, res) => {
   // convert a string to integer
   const id = parseInt(req.params.id, 10);

   try {
      const updatedAlbum = await Album.update(req.body, {
         where: {
            id: id,
         },
      });

      // if no album is found
      if (!updatedAlbum) {
         res.status(404).send('No Album found.');
      }

      res.status(200).json({ message: 'Album updated successfully', album: updatedAlbum });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating album', error: error.message });
   }
};

// function to delete album by id - DELETE ALBUM
export const deleteAlbumById = async (req, res) => {
   // convert string to integer
   const id = parseInt(req.params.id, 10);

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
      console.error(error);
      res.status(500).send(error);
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
      console.error(error);
      res.status(500).send(error);
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

      res.status(200).json(recentAlbums);
   } catch (error) {
      console.error(error);
      res.status(500).send(error);
   }
};
