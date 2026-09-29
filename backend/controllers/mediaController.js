import Media from '../models/Media.js';

// @desc    Get all media
// @route   GET /api/media
// @access  Public
export const getMedia = async (req, res) => {
  try {
    const media = await Media.find({ isActive: true });
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all media for admin
// @route   GET /api/media/admin
// @access  Private/Admin
export const getAdminMedia = async (req, res) => {
  try {
    const media = await Media.find({});
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create media
// @route   POST /api/media
// @access  Private/Admin
export const createMedia = async (req, res) => {
  try {
    const { type, title, url, isActive } = req.body;
    const media = new Media({ type, title, url, isActive });
    const createdMedia = await media.save();
    res.status(201).json(createdMedia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update media
// @route   PUT /api/media/:id
// @access  Private/Admin
export const updateMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (media) {
      Object.assign(media, req.body);
      const updatedMedia = await media.save();
      res.json(updatedMedia);
    } else {
      res.status(404).json({ message: 'Media not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete media
// @route   DELETE /api/media/:id
// @access  Private/Admin
export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (media) {
      await media.deleteOne();
      res.json({ message: 'Media removed' });
    } else {
      res.status(404).json({ message: 'Media not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


