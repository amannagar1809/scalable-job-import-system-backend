const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  url: { type: String },
  salary: { type: String },
  type: { type: String },
  category: { type: String },
  publishedDate: { type: Date },
  source: { type: String, required: true },
  rawData: { type: Object },
}, {
  timestamps: true,
});

jobSchema.index({ jobId: 1 }, { unique: true });
jobSchema.index({ title: 'text', description: 'text', company: 'text' });

module.exports = mongoose.model('Job', jobSchema);