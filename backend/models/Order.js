import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // Could be null if guest checkout is allowed, but based on requirements, customers usually login
  },
  orderType: {
    type: String,
    enum: ['Ready-Made', 'Custom'],
    required: true,
  },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
  }],
  customItems: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
  }],
  budget: {
    type: Number,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  recipientName: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  giftMessage: {
    type: String,
  },
  specialInstructions: {
    type: String,
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Confirmed', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
    default: 'New',
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;