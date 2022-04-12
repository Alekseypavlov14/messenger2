const User = require('./../models/User')

async function checkUser(req, res, next) {
    const user = req.body.user

    const candidate = await User.findById(user?._id)

    if (!candidate) {
        return res.json({
            error: 'your account is not active'
        })
    }

    next()
}

module.exports = checkUser