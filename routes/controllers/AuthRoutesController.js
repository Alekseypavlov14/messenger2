const User = require('./../../models/User')

class AuthRoutesController {
    async register(req, res) {
        const { login, password } = req.body

        const user = new User({
            login, password
        })

        const candidate = await User.findOne({login: login})

        if (candidate) {
            return res.json({
                message: 'This user is already exists'
            })
        }

        await user.save()
        res.json(user)
    }

    async login(req, res) {
        const { login, password } = req.body

        const candidate = await User.findOne({login, password})

        if (!candidate) { 
            return res.json({
                message: 'There isn`t such account'
            })
        }

        res.json(candidate)
    }
}

module.exports = new AuthRoutesController()