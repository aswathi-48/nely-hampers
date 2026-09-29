import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  type: {
    type: String, // 'hero', 'category', 'product', 'video', 'promo'
    required: true,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

const Media = mongoose.model('Media', mediaSchema);
export default Media;