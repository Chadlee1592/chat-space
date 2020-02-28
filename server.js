const express = require('express')
const connectDB = require('./config/db')

const http = require('http');
const socketio = require('socket.io')
const cors = require('cors');

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 5000

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }))
app.use(cors())

app.get('/', (req, res) => res.send('API Running'))

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/messages', require('./routes/api/messages'))
app.use('/api/servers', require('./routes/api/servers'))

io.on('connect', (socket) => {
    console.log('We have a new connection!!!')

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room)

        callback({ test: 'test' })
    });

    socket.on('sendMessage', (message, callback) => {
        // save message to db
        console.log(message)

        callback()
    })

    socket.emit('message')

    socket.on('disconnect', () => {
        console.log('User had left!!')
    })
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
