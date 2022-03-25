import React, { useRef, useState } from 'react'
import { useRedirect } from '../hooks/useRedirect'
import './../styles/Home.css'

const Home = () => {
    useRedirect()
    const [messages, setMessages] = useState([])

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

    return (
        <div>
            HomePage

            {messages.map((message, index) => (
                <div key={index}>{message.text}</div>
            ))}
        </div>
    )
}

export default Home