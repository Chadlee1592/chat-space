const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator')

const User = require('../../models/User');
const Server = require('../../models/MsgServer');
const Message = require('../../models/Message')

// @route   GET api/messages
// @desc    Get messages
// @access  Private
router.get('/', auth, async (req, res) => {

});

// @route   POST api/messages
// @desc    Save messages
// @access  Private

router.post('/', [
    check('serverName', "Please define which server to save the message").exists()
], auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password')

        const { serverName, messageIn } = req.body;

        const server = await Server.findOne({ name: serverName })

        if (!server) {
            return res.status(400).json({ error: 'Server does not exist' })
        }

        let messageSave = new Message({
            server: [
                {
                    serverId: server,
                    messageIn: [
                        { message: messageIn[0].message },
                        { user: user }
                    ],
                    serverName: serverName
                }
            ]
        })

        await messageSave.save();

        res.json(messageSave)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }



})

module.exports = router;