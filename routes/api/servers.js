const express = require('express');
const router = express.Router();

// @route   GET api/servers
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => res.send('Servers Route'));

module.exports = router;