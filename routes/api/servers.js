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

    const { name } = req.body;

    const user = await User.findById(req.user.id).select('-password')

    try {
        let server = await Server.findOne({ name })


        if (server) {
            const memberCheck = () => {
                let member
                for (let i = 0; i < server.members.length; i++) {

                    if (String(server.members[i]._id) === String(user._id)) {
                        member = true
                    }
                }
                return member;
            }
            if (memberCheck()) {
                res.status(400).json({ errors: [{ msg: 'Member already Exisits' }] })
            } else {
                server.members.push(user)

                server = await Server.findOneAndUpdate(
                    { name },
                    { members: server.members },
                    { new: true }
                )
                return res.json(server)

            }
        } else {
            server = new Server({
                name,
                members: user,
                creator: user
            })

            await server.save();

            res.json(server.name)

        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;