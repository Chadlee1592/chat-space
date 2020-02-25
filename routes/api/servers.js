const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator')

const User = require('../../models/User');
const Server = require('../../models/MsgServer');

// @route   GET api/servers
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => res.send('Servers Route'));

// @route   POST api/servers
// @desc    Create new server
// @access  Private
router.post('/', [
    check('name', "Please include a name for the server").exists()
], auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, members } = req.body;

    const user = await User.findById(req.user.id).select('-password')

    try {
        let server = await Server.findOne({ name })


        if (server) {
            res.status(400).json({ errors: [{ msg: 'Server name already exists' }] })
        }

        server = new Server({
            name,
            members,
            user
        })

        await server.save();

        res.json(server)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;