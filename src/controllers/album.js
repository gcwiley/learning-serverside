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
      res.status(201).json({ message: 'Successfully added album to the database' });
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
      res.status(500).json({ message: 'Error fetching albums', error });
   }
};
// function to fetch all albums from the database - GET ALBUMS PAGINATION
export const getPaginatedAlbums = async (req, res) => {
   try {
      // extract and validate pagination parameters from query string (with default values)
      let page = parseInt(req.query.page, 10) || 1; // default page is 1
      let size = parseInt(req.query.size, 10) || 10; // default size is 10

      // page and size must be positive integers
      if (page < 1) page = 1;
      if (page < 1) size = 10;

      // fetch the data and the count from the database
      const { count, row } = await Album.findAndCountAll({
         limit: limit,
         offset: offset,
         orderL [['date', 'DESC']], // order albums by date descending
      });

      const totalPages = Math.ceil(count / size)

      // handle cases where the requested page is out of bounds
      if (page > totalPage) {
         return res.status(200).json({
            totalItems: count,
            totalPages: totalPages,
            currentPage: page,
            itemsPerPage: size,
            items: [], // return an empty array if the page is out of bounds
         });
      }

      // construct response is a paginated format
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
      res.status(500).json({ message: 'Internal Server Error' })
   }
};

// Function to fetch invidual album by id - ALBUM BY ID
export const getAlbumById = async (req, res) => {
   // convert id string to an integer and preform minimal validation
   const id = parseInt(req.params.id, 10); // the second argument to parseInt enforces base-10 parsing

   // check if 'id' is a valid integer
   if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid album ID' });
   }
 
   try {
      // find the album by primary key (assumes 'id' is the primary key in the album model)
      const album = await Album.findByPk(id);

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
   // convert a string to integer and preform validation.
   const id = parseInt(req.params.id, 10);

   // check if 'id' is a valid integer
   if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid album ID' });
   }

   try {
      const [updatedAlbum] = await Album.update(req.body, {
         where: {
            id: id,
         },
      });

      // if no album is found to update
      if (updatedAlbum === 0) {
         res.status(404).json({ message: 'No album with that ID was found.' });
      }

      res.status(204).send();
   } catch (error) {
      console.error('Error updating album', error);
      res.status(500).json({ message: 'Error updating album', error });
   }
};

// function to delete album by id - DELETE ALBUM
export const deleteAlbumById = async (req, res) => {
   // convert a string to integer and preform validation.
   const id = parseInt(req.params.id, 10);

   // check if 'id' is a valid integer
   if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid album ID' });
   }

   try {
      const deletedAlbum = await Album.destroy({
         where: {
            id: id,
         },
      });

      // if no album is found
      if (deletedAlbum === 0) {
         res.status(404).json({ message: 'No album with that ID was found.');
      }

      res.status(204).send(); // returning no content for a successful deletion.
   } catch (error) {
      console.error('Error deleting event.', error);
      res.status(500).json({ message: 'Internal Server Error', error);
   }
};

// function to count all albums in database - ALBUM COUNT
export const getAlbumCount = async (req, res) => {
   try {
      const albumCount = await Album.count({});

      // send album count to client
      res.status(200).json(albumCount);
   } catch (error) {
      console.error('Error fetching album count', error);
      res.status(500).json({ message: 'Internal Server Error', error);
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
         return res.status(404).json({ message: 'No recent albums found.'});
      }

      // send recently created albums to client
      res.status(200).json(recentAlbums);
   } catch (error) {
      console.error('Error fetching recent albums.', error);
      res.status(500).json({ message: 'Internal Server Error', error });
   }
};
