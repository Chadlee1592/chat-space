const express = require('express');
const router = express.Router();

// @route   GET api/messages
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => res.send('Messages Route'));

module.exports = router;