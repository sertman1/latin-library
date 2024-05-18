const mongoose = require("mongoose");

const work_schema = new mongoose.Schema({
  title: {type: String, required: true},
  english_title: {type: String, index: true},
  alt_title: {type: String},
  code: {type: String, required: true, unique: true, index: true},
  text: {type: String, required: true},
  composition_date: {type: String},
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

const Work = mongoose.model('Work', work_schema);
module.exports = Work;