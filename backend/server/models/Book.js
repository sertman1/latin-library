const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  title_english: { type: String},
  text: { type: String, required: true},
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }]
});