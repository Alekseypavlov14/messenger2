import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRedirect } from '../hooks/useRedirect'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import NewContactPage from './NewContactPage'
import ChatPage from './ChatPage'
import Chat from '../components/Chat'
import './../styles/Home.css'

const Home = () => {
    useRedirect()
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])
    const [activeChat, setActiveChat] = useState(null)
    const [isNewChatPageOpened, setNewChatPageOpened] = useState(false)

    const websocket = useRef(new WebSocket(
        window.location.origin
        .replace(/https/, 'wss')
        .replace(/http/, 'ws')
        .replace('3000', '5000')
    ))
    const ws = websocket.current

    ws.onopen = () => {
        ws.send(JSON.stringify({
            event: 'message/connect',
            user: JSON.parse(localStorage.getItem('user')) || {}
        }))

        ws.onmessage = (message) => {
            message = JSON.parse(message.data)

            switch (message.event) {
                case 'message/connect':
                    setMessages(message.messages)
                    break

                case 'message/send':
                    setChats(chats => {
                        const user = JSON.parse(localStorage.getItem('user'))

                        chats.forEach(chat => {
                            if (chat.login === user.login) {
                                chat.messages.push(message)
                            }
                        })

                        return chats
                    })
                    break

                default: console.log('DEFAULT CASE')
            }
        }
    }

    ws.onerror = (error) => {
        console.log(error)
        ws.close()
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
        const contact = activeChat?.login

        if (contact) {
            setActiveChat(chats.filter(chat => chat.login === contact)[0])
        }
    }, [chats])

    useEffect(() => {
        sortMessages(messages)
    }, [messages])

    if (activeChat) {
        return (
            <ChatPage 
                chat={activeChat} 
                onClose={() => {
                    setActiveChat(null)
                }}
                onSend={(message) => {
                    ws.send(JSON.stringify({
                        event: 'message/send',
                        message: message
                    }))
                }}
            />
        )
    }

    if (isNewChatPageOpened) {
        return (
            <NewContactPage setActiveChat={setActiveChat}/>
        )
    }

    return (
        <div className='home'>
            <header className='home__header'>
                Web Messenger
            </header>

            <div className='home__messages'>
                {chats.map((chat, index) => (
                    <Chat key={index} {...chat} 
                        onClick={() => {
                            setActiveChat(chat)
                        }}
                    />
                ))}
            </div>

            <button 
                className='home__write-button'
                onClick={() => {
                    setNewChatPageOpened(true)
                }}
            >
                <FontAwesomeIcon icon={faPencil} />
            </button>
        </div>
    )
}

export default Home