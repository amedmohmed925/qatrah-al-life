const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,
    unique: true,
  },
  clientName: {
    type: String,
    required: [true, 'Please add a client name'],
  },
  organization: String,
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
  },
  requestType: {
    type: String,
    required: true,
    enum: [
      'consultation_booking',
      'sample_collection',
      'quality_consultation',
      'maintenance_support',
      'chemical_supply'
    ],
  },
  relatedProduct: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
  },
  details: String,
  status: {
    type: String,
    enum: ['new', 'in_progress', 'completed', 'cancelled'],
    default: 'new',
  },
}, { timestamps: true });

// Generate ticket number before saving
BookingSchema.pre('save', function(next) {
  if (!this.ticketNumber) {
    this.ticketNumber = 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Booking', BookingSchema);
