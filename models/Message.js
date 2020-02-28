const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    server: [
        {
            serverId: {
                type: mongoose.Schema.Types.ObjectId,
                refs: 'MsgServer'
            },
            messageIn: [
                {
                    message: {
                        type: String
                    },
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    },
                    date: {
                        type: Date,
                        default: Date.now()
                    }
                }
            ],
            serverName: {
                type: String,
                required: true
            }
        }

    ]
})

module.exports = Message = mongoose.model('Message', MessageSchema)