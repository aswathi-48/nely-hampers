import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  occasion: {
    type: String,
  },
  budget: {
    type: String,
  },
  requestedProducts: {
    type: String,
  },
  deliveryDate: {
    type: Date,
  },
  location: {
    type: String,
  },
  message: {
    type: String,
  },
  chatbotAnswers: {
    type: mongoose.Schema.Types.Mixed, // Can store JSON representing all raw answers
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'],
    default: 'New',
  }
}, {
  timestamps: true
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;