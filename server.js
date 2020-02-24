const express = require('express')
const connectDB = require('./config/db')

const http = require('http');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('API Running'))

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/messages', require('./routes/api/messages'))
app.use('/api/servers', require('./routes/api/servers'))

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
