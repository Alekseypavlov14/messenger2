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

        const chatPromises = chats.map(chat => this.initChat(chat))

        const initializedChats = await Promise.all(chatPromises).then(values => {
            return values
        })

        const messages = incoming.concat(outgoing)

        ws.send(JSON.stringify({
            event: 'message/connect',
            messages: messages,
            chats: initializedChats
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

    async initChat(chat) {
        const initializedChat = {
            users: [],
            messages: []
        }

        for (let i = 0; i < chat.users.length; i++) {
            const user = User.findById(chat.users[i])
            initializedChat.users.push(user)
        }

        for (let i = 0; i < chat.messages.length; i++) {
            const message = Message.findById(chat.messages[i])
            initializedChat.messages.push(message)
        }

        initializedChat.users = await Promise.all(initializedChat.users)
        initializedChat.messages = await Promise.all(initializedChat.messages)

        return initializedChat
    }
}

module.exports = new WSController()