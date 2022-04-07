const User = require('./../../models/User')
const Message = require('./../../models/Message')

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

        res.json({
            message: 'Success'
        })
    }
}

module.exports = new AccountRoutesController()