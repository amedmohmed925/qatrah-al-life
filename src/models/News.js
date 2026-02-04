const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  content: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  image: String,
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);
