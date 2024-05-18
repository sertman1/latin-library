const sectionSchema = new mongoose.Schema({
  title: {type: String, required: true},
  text: {type: String, required: true}
});