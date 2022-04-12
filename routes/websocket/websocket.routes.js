const User = require('../../models/User')
const WSController = require('./WSController')

async function router(message, ws, wss) {
    message = JSON.parse(message)

    // check user
    const user = await User.findOne(message.user)
    if (!user) return ws.send(JSON.stringify({
        event: 'error',
        code: 401
    }))

    switch (message.event) {
        case 'message/connect': 
            WSController.connect(message, ws, wss)
            break

        case 'message/send':
            WSController.send(message, ws, wss)
            break

        default: console.log('SWITCH DEFAULT CASE')
    }
}

module.exports = router