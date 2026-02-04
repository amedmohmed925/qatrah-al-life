const mongoose = require('mongoose');
const slugify = require('slugify');

const ServiceSchema = new mongoose.Schema({
  slug: String,
  title: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  shortDescription: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  fullContent: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  icon: String,
  image: String,
  category: {
    type: String,
    required: true,
    enum: ['consulting', 'quality', 'maintenance', 'operation'],
  },
}, { timestamps: true });

// Create service slug from the title (en) before save
ServiceSchema.pre('save', function(next) {
  this.slug = slugify(this.title.en, { lower: true });
  next();
});

module.exports = mongoose.model('Service', ServiceSchema);
