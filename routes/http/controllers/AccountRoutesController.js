const User = require('./../../../models/User')
const Message = require('./../../../models/Message')
const Chat = require('./../../../models/Chat')

class AccountRoutesController {
    async delete(req, res) {
        const user = req.body.user

        const candidate = await User.findOneAndDelete(user)

        const incomingMessages = await Message.find({to: user.login})
        const outgoingMessages = await Message.find({from: user.login})

        incomingMessages.forEach(message => {
            Message.findOneAndDelete(message)
        })

        outgoingMessages.forEach(message => {
            Message.findOneAndDelete(message)
        })

        const chats = await Chat.find({
            users: user._id
        })

        chats.forEach(chat => {
            Chat.findOneAndDelete(chat)
        })

        res.json({
            message: 'Success'
        })
    }
}

module.exports = new AccountRoutesController()