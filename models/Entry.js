const mongoose = require('mongoose');

const entrySchema = new mongoose.schema({
  title: String,
  description: String,
  email: String,
  link: String,
  created_at: { type: Date, default: Date.now }
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
