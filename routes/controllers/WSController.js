const User = require('./../../models/User')
const Message = require('./../../models/Message')
const Chat = require('../../models/Chat')
const initChat = require('./../shared/initChat')

class WSController {
    async connect(message, ws, wss) {
        ws.login = message.user.login

        const chats = await Chat.find({
            users: await User.findOne({login: message.user.login})
        })

        const chatPromises = chats.map(chat => initChat(chat))

        const initializedChats = await Promise.all(chatPromises)

        ws.send(JSON.stringify({
            event: 'message/connect',
            chats: initializedChats
        }))
    }

    async send(message, ws, wss) {
        const sentMessage = new Message(message.message)

        sentMessage.isSend = true
        await sentMessage.save()

        // get users
        const logins = message.chat.users
        const userPromises = logins.map(login => User.findOne({ login }))
        const users = await Promise.all(userPromises)

        const ids = users.map(user => user._id)

        const chat = await Chat.findOne({
            users: ids
        })

        chat.messages.push(sentMessage._id)
        await chat.save()

        const initializedChat = await initChat(chat)

        ws.send(JSON.stringify({
            event: 'message/send',
            chat: initializedChat
        }))

        wss.clients.forEach(client => {
            if (client.login === sentMessage.to) {
                client.send(JSON.stringify({
                    event: 'message/send',
                    chat: initializedChat
                }))
            }
        }) 
    }
}

module.exports = new WSController()