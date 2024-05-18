// routes/work.js
const express = require('express');
const router = express.Router();
const Work = require('../models/Work');

// GET work by ID
router.get('/works/:id', async (req, res) => {
  try {
    const work = await Work.findById(req.params.id).populate('chapters');
    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }
    res.json(work);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
