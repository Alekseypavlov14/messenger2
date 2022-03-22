const { Router } = require('express')
const bodyParser = require('body-parser')
const User = require('./../models/User')

const router = Router()

router.post('/register', bodyParser.json(), async (req, res) => {
    const { login, password } = req.body

    const user = new User({
        login, password
    })

    try {
        await user.save()
        res.json(user)
    }
    catch (e) {
        return res.json({
            message: 'This user is already exists'
        })
    }
})

router.post('/login', bodyParser.json(), async (req, res) => {
    const { login, password } = req.body

    const candidate = await User.findOne({login, password})

    if (!candidate) { 
        return res.json({
            message: 'There isn`t such account'
        })
    }

    res.json(candidate)
})

module.exports = router