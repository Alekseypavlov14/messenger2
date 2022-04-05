const User = require('./../../models/User')

class ContactRoutesController {
    async add(req, res) {
        const template = req.body.template
        const regexTemplate = new RegExp(template, 'i')

        const users = await User.find({})
        const candidates = users.filter(user => regexTemplate.test(user.login))

        res.json(candidates)
    }
}

module.exports = new ContactRoutesController()