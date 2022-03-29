const User = require('./../models/User')
const Message = require('./../models/Message')

async function messageHandler(message, ws, wss) {
    message = JSON.parse(message)

    switch (message.event) {
        case 'message/connect': 
            ws.login = message.user.login

            const incoming = await Message.find({to: ws.login})
            const outgoing = await Message.find({from: ws.login})

            const messages = incoming.concat(outgoing)

            ws.send(JSON.stringify({
                event: 'message/connect',
                messages: messages
            }))

            break


        case 'message/get':
            break


        case 'message/send':
            const sentMessage = new Message(message.message)

            sentMessage.isSend = true
            await sentMessage.save()

            ws.send(JSON.stringify({
                event: 'message/send',
                message: sentMessage
            }))

            const contactDevices = wss.clients.filter(client => client.login === sentMessage.to)
            contactDevices.forEach(contact => {
                contact.send(JSON.stringify({
                    event: 'message/send',
                    message, sentMessage
                }))
            }) 

            break


        default: console.log('SWITCH DEFAULT CASE')
    }
}

module.exports = messageHandler