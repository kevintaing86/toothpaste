const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: String,
  description: String,
  email: String,
  link: String
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
