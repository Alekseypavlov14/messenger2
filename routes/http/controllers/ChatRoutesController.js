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

        res.json(users)
    }

    async write(req, res) {
        const {user, candidate} = req.body
        
        const chatCandidate = await Chat.findOne({
            users: {$all: [candidate._id, user._id]}
        })

        if (chatCandidate) {
            const chat = await initChat(chatCandidate)

            if (chat) return res.json({
                chat: chat
            })

            return res.json({
                error: 'This chat is broken'
            })
        }

        const newChat = new Chat({
            users: [user, candidate],
            messages: []
        })

        const initializedChat = await initChat(newChat)

        await newChat.save()

        res.json({
            chat: initializedChat
        })
    }

    async get(req, res) {
        
    }
}

module.exports = new ChatRoutesController()