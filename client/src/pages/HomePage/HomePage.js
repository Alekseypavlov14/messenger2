/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPencil } from '@fortawesome/free-solid-svg-icons'
import { ChatLabel } from '../../components/chat-label/index'
import { useRedirect } from '../../hooks/useRedirect'
import { Link } from 'react-router-dom'
import { getChats } from './HomePage.model'
import './HomePage.css'

const HomePage = () => {
    useRedirect()

    const [chats, setChats] = useState([])

    useEffect(() => {
        getChats(setChats)
    }, [])

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