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
}

module.exports = new ContactRoutesController()