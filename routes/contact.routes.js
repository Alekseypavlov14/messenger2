const {Router} = require('express')
const User = require('./../models/User')
const bodyParser = require('body-parser')

const router = Router()

router.post('/add', bodyParser.json(), async (req, res) => {
    const template = req.body.template
    const regexTemplate = new RegExp(template, 'i')

    const users = await User.find({})
    const candidates = users.filter(user => regexTemplate.test(user.login))

    res.json(candidates)
})

module.exports = router