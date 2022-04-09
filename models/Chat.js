const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    users: [{ ref: 'User' }],
    messages: [{ ref: 'Message' }]
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat