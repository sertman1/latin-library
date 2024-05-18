const workSchema = new mongoose.Schema({
  title: {type: String, required: true},
  english_title: {type: String},
  alt_title: {type: String},
  code: {type: String, required: true, unique: true},
  text: {type: String, required: true},
  composition_date: {type: String},
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});