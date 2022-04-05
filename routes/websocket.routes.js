const User = require('./../models/User')
const Message = require('./../models/Message')
const WSController = require('./controllers/WSController')
const res = require('express/lib/response')

async function messageHandler(message, ws, wss) {
    message = JSON.parse(message)

    const user = await User.findOne(message.user)
    if (!user) return res.json({
        event: 'error',
        code: 401
    })

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

module.exports = messageHandler