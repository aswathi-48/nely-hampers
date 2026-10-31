export const handleMongooseError = (res, error) => {
  if (error?.name === 'ValidationError' || error?.name === 'CastError') {
    return res.status(400).json({ message: error.message });
  }

  if (error?.code === 11000) {
    const duplicateField = Object.keys(error.keyPattern || {})[0];
    const message = duplicateField === 'slug'
      ? 'Category with this slug already exists'
      : 'A record with this value already exists';
    return res.status(400).json({ message });
  }

  return res.status(500).json({ message: error.message });
};
