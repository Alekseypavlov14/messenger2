import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPencil } from '@fortawesome/free-solid-svg-icons'
import { useRedirect } from '../../hooks/useRedirect'
import { useNavigate } from 'react-router-dom'
import { NewContactPage } from '../NewContactPage/index'
import { ChatPage } from '../ChatPage/index'
import { Chat } from '../../components/chat/index'
import { init, connect, messageHandler } from './HomePage.logic'
import './Home.css'

const HomePage = () => {
    useRedirect()
    const [chats, setChats] = useState([])
    const [activeChat, setActiveChat] = useState(null)
    const [isNewChatPageOpened, setNewChatPageOpened] = useState(false)
    const navigate = useNavigate()

    const websocket = useRef(init())
    const ws = websocket.current

    ws.onopen = () => {
        connect(ws)

        ws.onmessage = (message) => {
            message = JSON.parse(message.data)

            messageHandler(message.event, {
                connect: () => {
                    setChats(message.chats)
                }
            })
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