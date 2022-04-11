import React from 'react'
import { useActiveChat } from '../../hooks/useActiveChat'
import { useRedirect } from '../../hooks/useRedirect'
import { ChatLabel } from '../../components/chatLabel/index'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPencil } from '@fortawesome/free-solid-svg-icons'
import './HomePage.css'

const HomePage = ({ chats, setActiveChat }) => {
    useRedirect()
    useActiveChat()

    return (
        <div className='home'>
            <header className='home__header'>

                <Link
                    className='home__header__account'
                    to='/account'
                >
                    <FontAwesomeIcon icon={faBars} />
                </Link>

                <div className='home__header__title'>Web Messenger</div>
            </header>

            <div className='home__chats'>
                {chats.map((chat, index) => (
                    <ChatLabel 
                        key={index} 
                        chat={chat}
                        onClick={() => {
                            setActiveChat(chat)
                        }}
                    />
                ))}
            </div>

            <Link 
                className='home__write-button'
                to='/new-chat'
            >
                <FontAwesomeIcon icon={faPencil} />
            </Link>
        </div>
    )
}

export { HomePage }