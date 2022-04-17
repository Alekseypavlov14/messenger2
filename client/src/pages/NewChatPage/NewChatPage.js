/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ExitButton } from './../../components/exit-button/index'
import { SearchResult } from '../../components/search-result'
import { findUsers, write } from './NewChatPage.model'
import { useNavigate } from 'react-router'
import './NewChatPage.css'

const NewChatPage = () => {
    const [users, setUsers] = useState([])
    const [value, setValue] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        findUsers(value, setUsers)
    }, [value])

    function openChat(candidate) {
        write(candidate).then(link => navigate(link))
    }

    return (
        <div className='new-chat-page'>
            <div className='new-chat-page__search'>
                <ExitButton className='new-chat-page__exit-button' />
                <input 
                    className='new-chat-page__search__input browser-default' 
                    onChange={e => setValue(e.target.value)}
                    placeholder='Search...'
                    type='text' 
                />
            </div>

            <SearchResult 
                choose={openChat}
                request={value} 
                users={users} 
            />
        </div>
    )
}

export { NewChatPage }