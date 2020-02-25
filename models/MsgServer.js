const mongoose = require('mongoose');

const MsgServerSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    members: [
        {
            memberId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }

})

module.exports = MsgServer = mongoose.model('MsgServer', MsgServerSchema)