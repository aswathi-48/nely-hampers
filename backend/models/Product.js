import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [{
    type: String,
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  productType: {
    type: String,
    enum: ['Box', 'Chocolate', 'Dress', 'Flower', 'Perfume', 'Teddy', 'Skincare', 'Accessories', 'Other', 'Ready-Made'],
    default: 'Ready-Made',
  },
  isCustomizable: {
    type: Boolean,
    default: false,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  stockCount: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;