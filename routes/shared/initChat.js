const Message = require('./../../models/Message')
const User = require('./../../models/User')
const Chat = require('./../../models/Chat')

async function initChat(chat) {
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

    // clear users passwords
    try {
        initializedChat.users = initializedChat.users.map(user => user.login)
        return initializedChat
    } catch(e) {
        return null
    }
}

module.exports = initChat