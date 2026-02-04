const mongoose = require('mongoose');

const LabPageSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    enum: ['organic', 'inorganic', 'microbiology'],
  },
  title: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  description: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  features: [{
    ar: String,
    en: String,
  }],
  image: {
    type: String,
    default: 'no-photo.jpg',
  },
}, { timestamps: true });

module.exports = mongoose.model('LabPage', LabPageSchema);
