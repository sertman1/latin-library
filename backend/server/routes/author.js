const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
