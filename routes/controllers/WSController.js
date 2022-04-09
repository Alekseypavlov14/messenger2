const User = require('./../../models/User')
const Message = require('./../../models/Message')
const Chat = require('../../models/Chat')

class WSController {
    async connect(message, ws, wss) {
        ws.login = message.user.login

        const incoming = await Message.find({to: ws.login})
        const outgoing = await Message.find({from: ws.login})

        const chats = await Chat.find({
            users: await User.findOne({login: message.user.login})
        })

        const messages = incoming.concat(outgoing)

        ws.send(JSON.stringify({
            event: 'message/connect',
            messages: messages,
            chats: chats
        }))
    }

    async send(message, ws, wss) {
        const sentMessage = new Message(message.message)

        sentMessage.isSend = true

        ws.send(JSON.stringify({
            event: 'message/send',
            message: sentMessage
        }))

        wss.clients.forEach(client => {
            if (client.login === sentMessage.to) {
                client.send(JSON.stringify({
                    event: 'message/send',
                    message: sentMessage
                }))
            }
        }) 

        await sentMessage.save()
    }
}

module.exports = new WSController()