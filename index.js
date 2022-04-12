const express = require('express')
const app = express()
const WebSocket = require('express-ws')(app)
const wss = WebSocket.getWss()
const path = require('path')
const connect = require('./database/connect')
const websocket = require('./routes/websocket/websocket')
require('dotenv').config()

// env
const PORT = process.env.PORT || 5000

// database
connect()

// index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.use(require('./routes/http/root.routes'))
app.ws('/', (ws, req) => websocket(ws, req, wss))

app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`)
})