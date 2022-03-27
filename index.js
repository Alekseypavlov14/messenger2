const express = require('express')
const app = express()
const WebSocket = require('express-ws')(app)
const wss = WebSocket.getWss()
const path = require('path')
require('dotenv').config()

const connect = require('./database/connect')
const messageHandler = require('./routes/websocket.routes')

// env
const PORT = process.env.PORT || 5000

// express app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.use(require('./routes/root.routes'))

app.ws('/', (ws, req) => {
    ws.on('message', (message) => {
        messageHandler(message, ws, wss)
    })
    ws.on('error', (error) => {
        res.json(error)
    })
})

app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`)
})

// database
connect()