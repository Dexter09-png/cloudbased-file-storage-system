const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  key: String,
  uploadedAt: Date,
});

const fileSchema = new mongoose.Schema({
  originalName: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  versions: [versionSchema],
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('File', fileSchema);