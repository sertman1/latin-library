const mongoose = require("mongoose");

const book_schema = new mongoose.Schema({
  title: { type: String, required: true },
  title_english: { type: String},
  text: { type: String, required: true},
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }]
});

const Book = mongoose.model('Book', book_schema);
module.exports = Book;