const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  category: {
    type: String,
    required: true,
    enum: ['chemicals', 'lab-tools', 'devices'],
  },
  description: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  image: String,
  stockStatus: {
    type: String,
    required: true,
    enum: ['available', 'out_of_stock', 'pre_order'],
    default: 'available',
  },
  price: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
