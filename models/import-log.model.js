const mongoose = require('mongoose');

const importLogSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  importDateTime: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  new: { type: Number, required: true },
  updated: { type: Number, required: true },
  failed: { type: Number, required: true },
  failures: [{
    jobId: String,
    error: String,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('ImportLog', importLogSchema);