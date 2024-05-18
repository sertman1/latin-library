const workSchema = new mongoose.Schema({
  title: String,
  publicationDate: Date,
  text: String, // plain text content for the entire work
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});