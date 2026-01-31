import path from 'path';

const UPLOAD_DIR = 'uploads';

// GET ALL IMAGES
export const getImages = async (req, res) => {
  try {
    // List files in the bucket with the specific prefix (folder)
    const [files] = await req.bucket.getFiles({ prefix: UPLOAD_DIR });

    // Transform the file list into a cleaner JSON response
    const images = files
      // Filter out the folder itself (sometimes returned as a 0-byte object)
      .filter((file) => file.name !== `${UPLOAD_DIR}/`)
      .map((file) => ({
        name: file.name,
        // Generates the public HTTP URL
        url: file.publicUrl(),
        // You can also include metadata if needed:
        contentType: file.metadata.contentType,
        timeCreated: file.metadata.timeCreated,
      }));

    res.status(200).json({
      success: true,
      message: 'Images retrieved successfully.',
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

// UPLOAD IMAGE
export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: 'No file uploaded' });
  }

  try {
    const file = req.file;
    const fileExtension = path.extname(file.originalname);
    // create a unique filename in an 'uploads' directory
    const fileName = `${UPLOAD_DIR}/${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${fileExtension}`;

    const fileUpload = req.bucket.file(fileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (error) => {
      console.error('Error uploading to Firebase Storage:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload image.',
        error: error.message,
      });
    });

    blobStream.on('finish', async () => {
      // make the file public (caution: this makes it accessible to anyone with the link)
      await fileUpload.makePublic();
      const publicUrl = fileUpload.publicUrl();

      res.status(200).json({
        success: true,
        message: 'Image uploaded successfully.',
        data: {
          imageUrl: publicUrl,
          fileName: fileName, // client needs this to delete later
        },
      });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error('Error in uploadImage:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during image upload.',
      error: error.message,
    });
  }
};

// DELETE IMAGE
export const deleteImage = async (req, res) => {
  const { fileName } = req.query;

  if (!fileName) {
    return res
      .status(400)
      .json({ success: false, message: 'File name is required.' });
  }

  // --- SECURITY CHECK ---
  // 1. normalize path to prevent traveral
  // use path.posix to ensure forward slashes regardless of OS
  const normalizePath = path.posix.normalize(fileName);

  // 2. scope check: ensure we are only deleting files in the 'uploads' folder
  if (!normalizePath.startsWith(`${UPLOAD_DIR}/`)) {
    return res.status(403).json({
      success: false,
      message: `Permission denied. You can only delete files in the '${UPLOAD_DIR}' directory.`,
    });
  }

  try {
    const file = req.bucket.file(normalizePath);
    const [exists] = await file.exists();

    if (!exists) {
      return res
        .status(404)
        .json({ success: false, message: 'Image not found.' });
    }

    await file.delete();

    res
      .status(200)
      .json({ success: true, message: 'Image deleted successfully.' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting image.',
      error: error.message,
    });
  }
};
