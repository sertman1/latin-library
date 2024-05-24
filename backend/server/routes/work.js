const express = require('express');
const router = express.Router();
const Work = require('../models/Work');

router.get('/works', async (req, res) => {
  try {
    const works = await Work.find();
    res.json(works);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
