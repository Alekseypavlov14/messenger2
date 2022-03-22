const express = require('express')
const app = express()
const WebSocket = require('express-ws')(app)
const wss = WebSocket.getWss()
const path = require('path')
require('dotenv').config()

const connect = require('./database/connect')
const messageHandler = require('./routes/websocket.routes')

// env
const HTTP_PORT = process.env.HTTP_PORT || 5000

// express app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.use(require('./routes/root.routes'))

app.ws('/', (ws, req) => {
    ws.on('message', (message) => {
        messageHandler(message, ws, wss)
    })
})

app.listen(HTTP_PORT, () => {
    console.log(`Server is working on port ${HTTP_PORT}`)
})

// database
connect()