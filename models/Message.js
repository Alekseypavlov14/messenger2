const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    from: {type: String},
    to: {type: String},
    time: {type: Date},
    isRead: {type: Boolean},
    isSend: {type: Boolean},
    text: {type: String}
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message