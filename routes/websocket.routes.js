function messageHandler(message, ws, wss) {
    message = JSON.parse(message)

    switch (message.event) {
        case 'message/get':
            break
        case 'message/send':
            ws.send(JSON.stringify(message))
            break
        default: console.log('SWITCH DEFAULT CASE')
    }
}

module.exports = messageHandler