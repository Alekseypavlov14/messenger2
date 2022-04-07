import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRedirect } from '../../hooks/useRedirect'
import { faBars, faPencil } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { NewContactPage } from '../NewContactPage/index'
import { ChatPage } from '../ChatPage/index'
import Chat from '../../components/chat/Chat'
import './Home.css'

const HomePage = () => {
    useRedirect()
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])
    const [activeChat, setActiveChat] = useState(null)
    const [isNewChatPageOpened, setNewChatPageOpened] = useState(false)
    const navigate = useNavigate()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chats])

    useEffect(() => {
        sortMessages(messages)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages])

    if (activeChat) {
        return (
            <ChatPage 
                chat={activeChat} 
                ws={ws}
                onClose={() => {
                    setActiveChat(null)
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
                <button
                    className='home__header__account'
                    onClick={() => navigate('/account')}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <div className='home__header__title'>Web Messenger</div>
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

export {
    HomePage
}