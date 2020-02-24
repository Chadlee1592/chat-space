const express = require('express')
const http = require('http');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('API Running'))

server.listen(PORT, () => console.log(`Server started on port ${PORT}`)
)