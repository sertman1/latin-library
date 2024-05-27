const express = require('express');
const router = express.Router();
const Author = require('../models/Author.js');

router.get('/', async (req, res) => {
  try {
    console.log("Attempting to fetch authors...");
    const authors = await Author.find();
    console.log("Authors fetched successfully:", authors);
    res.json(authors);
  } catch (err) {
    console.error("Error fetching authors:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
