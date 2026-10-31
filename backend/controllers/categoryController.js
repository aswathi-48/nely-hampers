import Category from '../models/Category.js';
import { handleMongooseError } from '../utils/handleMongooseError.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    handleMongooseError(res, error);
  }
};

// @desc    Get category by id
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    handleMongooseError(res, error);
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
  try {
    const { name, slug, description, image, isActive } = req.body;
    const normalizedName = typeof name === 'string' ? name.trim() : name;
    const normalizedSlug = typeof slug === 'string' ? slug.trim() : slug;
    
    const categoryExists = await Category.findOne({ slug: normalizedSlug });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category with this slug already exists' });
    }

    const category = new Category({
      name: normalizedName,
      slug: normalizedSlug,
      description,
      image,
      isActive,
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    handleMongooseError(res, error);
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
  try {
    const { name, slug, description, image, isActive } = req.body;
    const category = await Category.findById(req.params.id);

    if (category) {
      if (name !== undefined) category.name = typeof name === 'string' ? name.trim() : name;
      if (slug !== undefined) category.slug = typeof slug === 'string' ? slug.trim() : slug;
      if (description !== undefined) category.description = description;
      if (image !== undefined) category.image = image;
      if (isActive !== undefined) category.isActive = isActive;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    handleMongooseError(res, error);
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      await category.deleteOne();
      res.json({ message: 'Category removed' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    handleMongooseError(res, error);
  }
};

