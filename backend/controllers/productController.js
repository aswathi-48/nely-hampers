import Product from '../models/Product.js';
import { handleMongooseError } from '../utils/handleMongooseError.js';

const normalizeProductInput = (input) => {
  const product = { ...input };
  for (const field of ['category', 'stockCount']) {
    if (typeof product[field] === 'string' && product[field].trim() === '') {
      delete product[field];
    }
  }
  return product;
};

// @desc    Get all products (with filters)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const query = {};
    if (req.query.category) query.category = req.query.category;
    if (req.query.productType) query.productType = req.query.productType;
    if (req.query.isCustomizable !== undefined) query.isCustomizable = req.query.isCustomizable === 'true';

    const products = await Product.find(query).populate('category', 'name slug');
    res.json(products);
  } catch (error) {
    handleMongooseError(res, error);
  }
};

// @desc    Get product by id
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    handleMongooseError(res, error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const product = new Product(normalizeProductInput(req.body));
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    handleMongooseError(res, error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      Object.assign(product, normalizeProductInput(req.body));
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    handleMongooseError(res, error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    handleMongooseError(res, error);
  }
};

