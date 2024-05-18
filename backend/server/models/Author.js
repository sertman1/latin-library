const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, index: true},
  code: { type: String, required: true, unique: true, index: true },
  works: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work', required: true }],
  date_of_birth: { type: String },
  date_of_death: { type: String },
});
