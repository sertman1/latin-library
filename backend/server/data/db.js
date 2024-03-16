require("dotenv").config();
const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB")
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connect };