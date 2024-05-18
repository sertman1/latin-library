// server/routes/author.js

const express = require('express');
const router = express.Router();
const Work = require('../models/Work');

// GET works by author (and optionally by work)
router.get('/authors/search', async (req, res) => {
  try {
    const { author, work } = req.query;

    // Construct query based on provided parameters
    const query = { author };
    if (work) {
      query.title = work;
    }

    // Find works by author and optionally by work
    const works = await Work.find(query);

    res.json(works);
  } catch (error) {
    console.error('Error searching works by author:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
