const Message = require('../../models/Message')
const User = require('../../models/User')
const Chat = require('../../models/Chat')
const initChat = require('./../shared/initChat')

class WSController {
    async connect(message, ws, wss) {
        ws.login = message.user.login

        const user = await User.findOne({login: message.user.login})

        const chats = await Chat.find({
            users: user._id
        })

        const chatPromises = chats.map(chat => initChat(chat))

        const initializedChats = await Promise.all(chatPromises)

        const filteredChats = initializedChats.filter(chat => Boolean(chat))

        ws.send(JSON.stringify({
            event: 'message/connect',
            chats: filteredChats
        }))
    }

    async send(message, ws, wss) {
        const sentMessage = new Message(message.message)

        // save message
        sentMessage.isSend = true
        await sentMessage.save()

        // get chat by id
        const chat = await Chat.findById(message.chat._id)

        // check chat
        if (!chat) return ws.send(JSON.stringify({
            event: 'error',
            error: 'there is not this chat'
        }))

        // add to DB chat message _id
        chat.messages.push(sentMessage._id)
        await chat.save()

        // add message to initialized chat
        const initializedChat = message.chat
        initializedChat.messages.push(sentMessage)

        // send chat to users
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