import React, { useEffect, useRef, useState } from 'react'
import Chat from '../components/Chat'
import { useRedirect } from '../hooks/useRedirect'
import './../styles/Home.css'

const Home = () => {
    useRedirect()
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])

    const websocket = useRef(new WebSocket(
        window.location.origin
        .replace(/http/, 'ws')
        .replace(/https/, 'wss')
        .replace('3000', '5000')
    ))
    const ws = websocket.current

    ws.onopen = () => {
        ws.send(JSON.stringify({
            event: 'message/connect',
            user: JSON.parse(localStorage.getItem('user'))
        }))

        ws.onmessage = (message) => {
            message = JSON.parse(message.data)

            switch (message.event) {
                case 'message/connect':
                    setMessages(message.messages)
                    break

                case 'message/send':
                    console.log(message)
                    setMessages(prev => prev.concat([message]))
                    break

                default: console.log('DEFAULT CASE')
            }
        }

        // ws.send(JSON.stringify({
        //     event: 'message/send',
        //     message: {
        //         to: 'Jack',
        //         from: 'Alex',
        //         time: Date.now(),
        //         isRead: false,
        //         isSend: false,
        //         text: 'Hello, Jack'
        //     }
        // }))
    }

    function getContactsFromMessages(messages) {
        const contacts = []
        const user = JSON.parse(localStorage.getItem('user'))

        messages.forEach(message => {
            // take login of contact
            const opponent = (message.to === user.login) ? message.from : message.to

            // add login to chats array
            if (!contacts.includes(opponent)) {
                contacts.push(opponent)
            }
        })

        return contacts
    }

    function sortMessages(messages) {
        let contacts = getContactsFromMessages(messages)

        contacts = contacts.map(contact => {
            return {
                login: contact,
                messages: []
            }
        })

        messages.forEach(message => {
            const user = JSON.parse(localStorage.getItem('user'))
            const opponent = (message.to === user.login) ? message.from : message.to

            contacts.forEach(contact => {
                if (contact.login === opponent) contact.messages.push(message)
            })
        })

        setChats(contacts)
    }

    useEffect(() => {
        sortMessages(messages)
    }, [messages])

    return (
        <div>
            {chats.map((chat, index) => (
                <Chat key={index} {...chat} />
            ))}
        </div>
    )
}

export default Home