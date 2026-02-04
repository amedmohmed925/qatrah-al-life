const mongoose = require('mongoose');

const GeneralConfigSchema = new mongoose.Schema({
  stats: {
    newProjects: { type: Number, default: 0 },
    ongoingProjects: { type: Number, default: 0 },
    finishedProjects: { type: Number, default: 0 },
    visitors: { type: Number, default: 0 },
  },
  contactInfo: {
    phone: String,
    email: String,
    whatsapp: String,
    address: String,
  },
  socialLinks: {
    facebook: String,
    linkedin: String,
    twitter: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('GeneralConfig', GeneralConfigSchema);
