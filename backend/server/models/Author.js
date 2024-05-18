const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  works: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work', required: true }],
  dateOfBirth: { type: Date},
  dateOfDeath: { type: Date},
});
