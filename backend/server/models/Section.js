const mongoose = require("mongoose");

const section_schema = new mongoose.Schema({
  title: {type: String, required: true},
  text: {type: String, required: true}
});

const Section = mongoose.model('Section', section_schema);
module.exports = Section;