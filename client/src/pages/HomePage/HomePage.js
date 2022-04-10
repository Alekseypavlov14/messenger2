import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPencil } from '@fortawesome/free-solid-svg-icons'
import { useRedirect } from '../../hooks/useRedirect'
import { useNavigate } from 'react-router-dom'
import { NewContactPage } from '../NewContactPage/index'
import { ChatPage } from '../ChatPage/index'
import { Chat } from '../../components/chat/index'
import { User } from '../../modules/user/user'
import './Home.css'

const HomePage = () => {
    useRedirect()
    const [activeChat, setActiveChat] = useState(null)
    const [isNewChatPageOpened, setNewChatPageOpened] = useState(false)
    const navigate = useNavigate()

    const [chats, setChats] = useState([])

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
            user: User.get()
        }))

        ws.onmessage = (message) => {
            message = JSON.parse(message.data)

            switch (message.event) {
                case 'message/connect':
                    setChats(message.chats)
                    break

                case 'message/send':
                    setChats(prev => prev.concat([message.chat]))
                    break

                case 'error':
                    console.log(message)
                    break

                default: console.log('DEFAULT CASE')
            }
        }
    }

    ws.onerror = (error) => {
        console.log(error)
        ws.close()
    }

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
            <NewContactPage setChats={setChats} setActiveChat={setActiveChat}/>
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
                    <Chat 
                        key={index} 
                        users={chat.users}
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

export { HomePage }