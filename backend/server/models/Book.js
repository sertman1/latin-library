const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true}, // plain text content for the entire book
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }]
});