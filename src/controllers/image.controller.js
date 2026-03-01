import path from 'path';
import { Image } from '../models/image.js';
import { Op } from 'sequelize';

const UPLOAD_DIR = 'uploads';

// UPLOAD IMAGE (NEW)
export const uploadImage = async (req, res) => {
  // error checking
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: 'No file uploaded.' });
  }

  try {
    const file = req.file;
    const fileExtension = path.extname(file.originalName);
    const fileName = `${UPLOAD_DIR}/${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${fileExtension}`;

    const fileUpload = req.bucket.file(fileName);

    const { originalName, description } = req.body;
    const image = await Image.create({
      originalName,
      description,
    });
    res.status(201).json({
      success: true,
      message: 'Successfully created image in database.',
      data: image,
    });
  } catch (error) {
    console.error('Error creating image:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating image.',
      error: error.message,
    });
  }
};

// GET ALL IMAGES
export const getImages = async (req, res) => {
  try {
    // retrieve all images ordered by date (most recent first)
    const images = await Image.findAll({
      order: [['name', 'DESC']], // order images by name - fix this
    });

    // if no images are found
    if (images.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: 'No Images were found.' });
    }

    // send the list of images to the client
    res.status(200).json({
      success: true,
      message: 'Successfully fetched all images.',
      data: images,
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching images.',
      error: error.message,
    });
  }
};

// GET IMAGES WITH PAGINATION
export const getImagesWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: heroes } = await Image.findAndCountAll({
      order: [['date', 'DESC']],
      limit,
      offset,
    });

    res.status(200).json({
      success: true,
      message: heroes.length
        ? 'Successfully fetched images.'
        : 'No images found.',
      data: heroes,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching images.',
      error: error.message,
    });
  }
};

// GET IMAGE BY ID
export const getImageById = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);

    // if no hero is found, handle the empty result
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: 'No image with that ID was found.' });
    }

    res
      .status(200)
      .json({
        success: true,
        message: 'Successfully fetched image.',
        data: image,
      });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching image.',
      error: error.message,
    });
  }
};

// UPDATE IMAGE BY ID
export const updateImageById = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);

    // if no image is found
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: 'No image with that ID was found.' });
    }

    const updatedImage = await image.update({
      name: req.body.name,
      alterEgo: req.body.alterEgo,
      placeOfOrigin: req.body.placeOfOrigin,
      abilities: req.body.abilities,
      biography: req.body.biography,
    });

    res.status(200).json({
      success: true,
      message: 'Successfully updated image.',
      data: updatedImage,
    });
  } catch (error) {
    console.error('Error updating image.', error);
    res.status(500).json({
      success: false,
      message: 'Error updating image.',
      error: error.message,
    });
  }
};

// DELETE IMAGE BY ID
export const deleteImageById = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);

    // if no image is found
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: 'No hero with that ID was found.' });
    }

    await image.destroy();
    res
      .status(200)
      .json({ success: true, message: 'Image deleted successfully.' });
  } catch (error) {
    console.error('Error deleting image.:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting image.',
      error: error.message,
    });
  }
};

// GET IMAGE COUNT
export const getImageCount = async (req, res) => {
  try {
    const imageCount = await Image.count({});

    // send image count to client
    res.status(200).json({
      success: true,
      message: 'Successfully fetched hero count.',
      data: imageCount,
    });
  } catch (error) {
    console.error('Error fetching image count:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching image count.',
      error: error.message,
    });
  }
};

// GET RECENTLY CREATED IMAGES
export const getRecentlyCreatedImages = async (req, res) => {
  try {
    const recentImages = await Image.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    if (recentImages.length === 0) {
      return res.status(404).json('no recent heroes');
    }
    // send recently created images to client
    res.status(200).json({
      success: true,
      message: 'Successfully fetched recent images.',
      data: recentImages,
    });
  } catch (error) {
    console.error('Error fetching recent images:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent images.',
      error: error.message,
    });
  }
};

// SEARCH IMAGES
export const searchImages = async (req, res) => {
  const { query } = req.query;

  // validate query parameters
  if (!query) {
    return res.status(400).json({
      success: false,
      message: 'Query parameter is required for searching images.',
    });
  }

  try {
    const images = await Image.findAll({
      where: {
        // uses the Op.or operator to search for images that match any of the search criteria.
        [Op.or]: [
          // uses the 'Op.iLike' operator for case-insensitive search
          { originalName: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    if (images.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No images matching your search query were found.',
      });
    }

    res
      .status(200)
      .json({ success: true, message: 'Image search results.', data: images });
  } catch (error) {
    console.error('Error searching images:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching images.',
      error: error.message,
    });
  }
};
