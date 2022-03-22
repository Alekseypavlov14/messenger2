const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    login: {type: String, unique: true},
    password: {type: String}
})

const User = mongoose.model('User', userSchema)

module.exports = User