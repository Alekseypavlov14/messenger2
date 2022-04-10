const User = require('./../../models/User')
const Chat = require('./../../models/Chat')
const initChat = require('./../shared/initChat')

class ContactRoutesController {
    async find(req, res) {
        const { template } = req.body
        const regexTemplate = new RegExp(template, 'i')

        const users = await User.find({})
        const candidates = users.filter(user => regexTemplate.test(user.login))

        res.json(candidates)
    }

    async write(req, res) {
        const {user, candidate} = req.body
        
        const chatCandidate = await Chat.findOne({
            users: {$all: [candidate._id, user._id]}
        })

        if (chatCandidate) return res.json({
            chat: await initChat(chatCandidate)
        })

        const newChat = new Chat({
            users: [user, candidate],
            messages: []
        })

        await newChat.save()

        res.json({
            chat: await initChat(chatCandidate)
        })
    }
}

module.exports = new ContactRoutesController()