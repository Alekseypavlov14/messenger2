const User = require('./../../models/User')
const bcrypt = require('bcrypt')

class AuthRoutesController {
    async register(req, res) {
        const { login, password } = req.body

        const candidate = await User.findOne({login: login})

        if (candidate) {
            return res.json({
                message: 'This user is already exists'
            })
        }

        const hashedPassword = bcrypt.hashSync(password, 7)

        const user = new User({
            login: login, 
            password: hashedPassword
        })

        await user.save()
        res.json(user)
    }

    async login(req, res) {
        const { login, password } = req.body

        const candidate = await User.findOne({login})

        if (!candidate) { 
            return res.json({
                message: 'There isn`t such account'
            })
        }

        if (!bcrypt.compareSync(password, candidate?.password)) {
            return res.json({
                message: 'Incorrect login or password'
            })
        }

        res.json(candidate)
    }
}

module.exports = new AuthRoutesController()