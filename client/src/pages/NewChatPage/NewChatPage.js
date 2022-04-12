/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useActiveChat } from '../../hooks/useActiveChat'
import { ExitButton } from './../../components/exit-button/index'
import { SearchResult } from '../../components/search-result'
import { User } from '../../modules/user/user'
import { findUsers, write } from './NewChatPage.model'
import './NewChatPage.css'

const NewChatPage = ({ activeChat, setActiveChat }) => {
    const [users, setUsers] = useState([])
    const [value, setValue] = useState('')
    const user = User.get()
    useActiveChat(activeChat)

    useEffect(() => {
        findUsers(user, value, setUsers)
    }, [value])

    function openChat(candidate) {
        write(user, candidate, setActiveChat)
    }

    return (
        <div className='new-chat-page'>
            <div className='new-chat-page__search'>
                <ExitButton className='new-chat-page__exit-button' />
                <input 
                    className='new-chat-page__search__input' 
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