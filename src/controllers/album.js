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
      res.status(201).json({ message: 'Successfully added album to database', album });
   } catch (error) {
      console.error('Error creating album:', error);
      res.status(400).json({ message: 'Error creating album', error: error.message });
   }
};

// Function to fetch all albums from database - ALL ALBUMS
export const getAlbums = async (req, res) => {
   try {
      // retrieve all albums ordered by date (most recent first_
      const albums = await Album.findAll({
         order: [['releaseDate', 'DESC']], // order albums by date
      });

      // if no albums are found, handle the empty result
      if (albums.length === 0) {
         return res.status(404).json({ message: 'No albums found' });
      }

      // send the list of albums to the client
      res.status(200).json(albums);
   } catch (error) {
      console.error('Error fetching albums:', error);
      res.status(500).json({ message: 'Error fetching albums', error: error.message });
   }
};
// function to fetch all albums from the database - GET ALBUMS PAGINATION
export const getPaginatedAlbums = async (req, res) => {
   try {
      // extract and validate pagination parameters from query string (with default values)
      let { page = 1, size = 10 } = req.query; // default page is 1, default size is 10

      // convert page and size to numbers
      page = Number(page);
      size = Number(size);

      // page and size must be positive integers
      if (page < 1) page = 1;
      if (page < 1) size = 10;

      // fetch the data and the count from the database
      const { count, rows } = await Album.findAndCountAll({
         limit: size,
         offset: (page - 1) * size,
         order: [['releaseDate', 'DESC']], // order albums by date descending
      });

      const totalPages = Math.ceil(count / size);

      // handle cases where the requested page is out of bounds
      if (page > totalPages && count > 0) {
         return res.status(404).json({
            message: 'Page out of range',
            totalItems: count,
            totalPages: totalPages,
            currentPage: page,
            itemsPerPage: size,
            items: [], // return an empty array if the page is out of bounds
         });
      }

      // construct response in a paginated format
      const paginationResult = {
         totalItems: count,
         totalPages: totalPages,
         currentPage: page,
         itemsPerPage: size,
         items: rows,
      };

      res.status(200).json(paginationResult);
   } catch (error) {
      console.error('Error in fetching paginated data:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
   }
};

// Function to fetch invidual album by id - ALBUM BY ID
export const getAlbumById = async (req, res) => {
   try {
      // find the album by primary key (assumes 'id' is the primary key in the album model)
      const album = await Album.findByPk(req.params.id);

      // if album is not found, handle the empty result
      if (!album) {
         return res.status(404).json({ message: 'No album with that ID was found.' });
      }

      // send album data to client
      res.status(200).json(album);
   } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ message: 'Error fetching album', error: error.message });
   }
};

// function to update a album by id - UPDATE ALBUM BY ID
export const updateAlbumById = async (req, res) => {
   try {
      const album = await Album.findByPk(req.params.id);

      if (!album) {
         return res.status(404).json({ message: 'No album with that ID was found.' });
      }
      const updatedAlbum = await Album.update({
         title: req.body.title,
         artist: req.body.artist,
         releaseDate: new Date(req.body.releaseDate),
         label: req.body.label,
         studio: req.body.studio,
         genre: req.body.genre,
         summary: req.body.summary,
      });

      res.status(200).json({ message: 'Album updated successfully.', album: updatedAlbum });
   } catch (error) {
      console.error('Error updating album.', error);
      res.status(500).json({ message: 'Error updating album.', error: error.message });
   }
};

// function to delete album by id - DELETE ALBUM BY ID
export const deleteAlbumById = async (req, res) => {
   try {
      const album = await Album.findByPk(req.parama.id);

      // if no album is found
      if (!album) {
         res.status(404).json({ message: 'No album with that ID was found.' });
      }

      await album.destroy();
      res.status(200).json({ message: 'Album deleted successfully.'});
   } catch (error) {
      console.error('Error deleting event.', error);
      res.status(500).json({ message: 'Error deleting album', error: error.message });
   }
};

// function to count all albums in database - ALBUM COUNT
export const getAlbumCount = async (req, res) => {
   try {
      const albumCount = await Album.count({});

      // send album count to client
      res.status(200).json({ count: albumCount });
   } catch (error) {
      console.error('Error fetching album count', error);
      res.status(500).json({ message: 'Error fetching album count', error: error.message });
   }
};

// function to get the 10 most recently created albums - RECENT ALBUMS
export const getRecentlyCreatedAlbums = async (req, res) => {
   try {
      // finds 10 most recent albums and sorts by 'createdAt' in descending order
      const recentAlbums = await Album.findAll({
         order: [['createdAt', 'DESC']],
         limit: 10,
      });

      if (recentAlbums.length === 0) {
         return res.status(404).json({ message: 'No recent albums found.' });
      }

      // send recently created albums to client
      res.status(200).json(recentAlbums);
   } catch (error) {
      console.error('Error fetching recent albums.', error);
      res.status(500).json({ message: 'Error fetching recent albums', error: error.message });
   }
};
