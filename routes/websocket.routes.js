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

        case 'message/send':
            const sentMessage = new Message(message.message)

            sentMessage.isSend = true

            ws.send(JSON.stringify({
                event: 'message/send',
                message: sentMessage
            }))

            wss.clients.forEach(client => {
                if (client.login === sentMessage.to) {
                    console.log('success')
                    client.send(JSON.stringify({
                        event: 'message/send',
                        message: sentMessage
                    }))
                }
            }) 

            await sentMessage.save()

            break

        case 'message/read':
            const messagesToClient = []

            for (let i = 0; i < message.messages.length; i++) {
                const readMessage = await Message.findOne(message.messages[i])
                readMessage.isRead = true
                messagesToClient.push(readMessage)
                await readMessage.save()
            }
            
            const contact = message.messages[0].from
            wss.clients.forEach(client => {
                if (client.login === contact) {
                    client.send(JSON.stringify({
                        event: 'message/read',
                        messages: messagesToClient
                    }))
                }
            })
            break

        default: console.log('SWITCH DEFAULT CASE')
    }
}

module.exports = messageHandler