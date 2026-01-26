import { Op } from 'sequelize';
import { Album, Artist } from '../models/index.js';

// CREATE NEW ALBUM
export const newAlbum = async (req, res) => {
  try {
    // builds a new model instance and calls save on it.
    const album = await Album.create({
      title: req.body.title,
      artist: req.body.artist,
      releaseDate: new Date(req.body.releaseDate),
      label: req.body.label,
      studio: req.body.studio,
      genre: req.body.genre,
      summary: req.body.summary,
    });
    res.status(201).json({
      success: true,
      message: 'Successfully created new album.',
      data: album,
    });
  } catch (error) {
    console.error('Error creating album:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating album.',
      error: error.message,
    });
  }
};

// CREATE NEW ALBUM TEST
export const newAlbumTest = async (req, res) => {
  try {
    const {
      title,
      artist,
      releaseDate,
      label,
      studio,
      genre,
      summary,
      coverImageUrl,
    } = req.body;

    // 1. handle the artist relationship
    // we check if the artist exists by name. if not, we create them.
    // this allows the frontend to send a string and we handle the ID
    const [artistRecord] = await Artist.findOrCreate({
      where: { name: artist },
      defaults: {
        biography: '', // default values for new artist
        website: '',
      },
    });

    // 2. create the album using the artist's ID
    const album = await Album.create({
      title,
      artistId: artistRecord.id, // use the UUID
      releaseDate: new Date(releaseDate),
      label,
      studio,
      genre,
      summary,
      coverImageUrl,
    });

    res.status(201).json({
      success: true,
      message: 'Successfully created new album.',
      data: album,
    });
  } catch (error) {
    console.error('Error creating album:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating album.',
      error: error.message,
    });
  }
};

// GET ALL ALBUMS
export const getAlbums = async (req, res) => {
  try {
    // retrieve all albums ordered by date (most recent first)
    const albums = await Album.findAll({
      order: [['releaseDate', 'DESC']], // order albums by date
    });

    // if no albums are found, handle the empty result
    if (albums.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No albums found.' });
    }

    // send the list of albums to the client
    res.status(200).json({
      success: true,
      message: 'Successfully fetched all albums',
      data: albums,
    });
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching albums.',
      error: error.message,
    });
  }
};
// GET ALBUMS PAGINATION
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

    res.status(200).json({
      success: true,
      message: 'Successfully fetched paginated results.',
      data: paginationResult,
    });
  } catch (error) {
    console.error('Error in fetching paginated data:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// GET ALBUM BY ID
export const getAlbumById = async (req, res) => {
  try {
    // find the album by primary key (assumes 'id' is the primary key in the album model)
    const album = await Album.findByPk(req.params.id);

    // if album is not found, handle the empty result
    if (!album) {
      return res
        .status(404)
        .json({ success: false, message: 'No album with that ID was found.' });
    }

    // send album data back to client
    res.status(200).json({
      success: true,
      message: 'Successfully fetched album',
      data: album,
    });
  } catch (error) {
    console.error('Error fetching album:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching album.',
      error: error.message,
    });
  }
};

// UPDATE ALBUM BY ID
export const updateAlbumById = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id);

    // if no album is found
    if (!album) {
      return res
        .status(404)
        .json({ sucess: false, message: 'No album with that ID was found.' });
    }
    const updatedAlbum = await album.update({
      title: req.body.title,
      artist: req.body.artist,
      releaseDate: new Date(req.body.releaseDate),
      label: req.body.label,
      studio: req.body.studio,
      genre: req.body.genre,
      summary: req.body.summary,
    });

    res.status(200).json({
      success: true,
      message: 'Successfully updated album.',
      data: updatedAlbum,
    });
  } catch (error) {
    console.error('Error updating album.', error);
    res.status(500).json({
      success: false,
      message: 'Error updating album.',
      error: error.message,
    });
  }
};

// DELETE ALBUM BY ID
export const deleteAlbumById = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id);

    // if no album is found
    if (!album) {
      return res
        .status(404)
        .json({ success: false, message: 'No album with that ID was found.' });
    }

    await album.destroy();
    res
      .status(200)
      .json({ success: true, message: 'Album deleted successfully.' });
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting album.',
      error: error.message,
    });
  }
};

// GET ALBUM COUNT
export const getAlbumCount = async (req, res) => {
  try {
    const albumCount = await Album.count({});

    // send album count to client
    res.status(200).json({
      success: true,
      message: 'Successfully fetched Album count.',
      data: albumCount,
    });
  } catch (error) {
    console.error('Error fetching album count:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching album count.',
      error: error.message,
    });
  }
};

// GET RECENT ALBUMS
export const getRecentlyCreatedAlbums = async (req, res) => {
  try {
    // finds 10 most recent albums and sorts by 'createdAt' in descending order
    const recentAlbums = await Album.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    if (recentAlbums.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No recent albums found.' });
    }

    // send recently created albums to client
    res.status(200).json({
      success: true,
      message: 'successfully fetched recent albums',
      data: recentAlbums,
    });
  } catch (error) {
    console.error('Error fetching recent albums:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent albums.',
      error: error.message,
    });
  }
};

// SEARCH ALBUMS
export const searchAlbums = async (req, res) => {
  const { query } = req.query;

  // validate query parameters
  if (!query) {
    return res.status(400).json({
      success: false,
      message: 'Query parameter is required for searching albums.',
    });
  }

  try {
    const albums = await Album.findAll({
      where: {
        // uses the Op.or operator to search for albums that match any of the search criteria.
        [Op.or]: [
          // uses the 'Op.iLike' operator for case-insensitive search
          { title: { [Op.iLike]: `%${query}%` } },
          { artist: { [Op.iLike]: `%${query}%` } },
          { genre: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    if (albums.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No albums found matching your search query.',
      });
    }

    res
      .status(200)
      .json({ success: true, message: 'Album search results.', data: albums });
  } catch (error) {
    console.error('Error searching albums:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching albums.',
      error: error.message,
    });
  }
};
