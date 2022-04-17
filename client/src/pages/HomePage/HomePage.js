/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPencil } from '@fortawesome/free-solid-svg-icons'
import { ChatLabel } from '../../components/chat-label/index'
import { useRedirect } from '../../hooks/useRedirect'
import { Link } from 'react-router-dom'
import { getChats } from './HomePage.model'
import { Loader } from '../../components/loader'
import './HomePage.css'

const HomePage = () => {
    useRedirect()

    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchChats = useCallback(async () => {
        setLoading(true)
        const chats = await getChats()
        setChats(chats)
        setLoading(false)
    }, [])

    useEffect(() => {
        fetchChats()
    }, [fetchChats])

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

                {loading && <Loader className='home__loader' />}
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