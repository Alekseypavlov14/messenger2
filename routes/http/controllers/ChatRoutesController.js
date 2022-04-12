const User = require('../../../models/User')
const Chat = require('../../../models/Chat')
const initChat = require('../../shared/initChat')

class ChatRoutesController {
    async find(req, res) {
        const { template } = req.body
        const regexTemplate = new RegExp(template, 'i')

        const users = await User.find({ 
            login: { $regex: regexTemplate }
        })

        const logins = users.map(user => user.login)

        res.json(logins)
    }

    async write(req, res) {
        const {user, candidate} = req.body
        
        const chatCandidate = await Chat.findOne({
            users: {$all: [candidate._id, user._id]}
        })

        const chat = await initChat(chatCandidate)

        if (chat) return res.json({
            chat: chat
        })

        const newChat = new Chat({
            users: [user, candidate],
            messages: []
        })

        const initializedChat = await initChat(newChat)

        if (!initializedChat) return res.json({
            event: 'message/error',
            error: 'user is not defined'
        })

        // if chat is ok - save it
        await newChat.save()

        res.json({
            chat: initializedChat
        })
    }
}

module.exports = new ChatRoutesController()