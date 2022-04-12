const router = require('./websocket.routes')

function websocket(ws, req, wss) {
    ws.on('message', (message) => {
        router(message, ws, wss)
    })
    ws.on('error', () => {
        ws.close()
    })
}

module.exports = websocket