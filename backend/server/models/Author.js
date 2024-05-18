const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  code: { type: String, required: true, unique: true },
  works: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work', required: true }],
  date_of_birth: { type: String },
  date_of_death: { type: String },
});
