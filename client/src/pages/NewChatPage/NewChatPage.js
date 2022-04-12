/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useActiveChat } from '../../hooks/useActiveChat'
import { ExitButton } from './../../components/exit-button/index'
import { SearchResult } from '../../components/search-result'
import { http } from '../../modules/http/Http.controller'
import { User } from '../../modules/user/user'
import './NewChatPage.css'

const NewChatPage = ({ activeChat, setActiveChat }) => {
    useActiveChat(activeChat)
    const user = User.get()
    const [users, setUsers] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        if (!value) return setUsers([])
        
        http.post('/chat/find', {
            template: value,
            user: user
        }).then(data => {
            if (data.error) return console.log(data.error)
            setUsers(data)
        })
    }, [value])

    function openChat(candidate) {
        http.post('/chat/write', {
            candidate: candidate,
            user: user
        }).then(data => {
            setActiveChat(data.chat)
        })
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

            <div className='new-chat-page__results'>
                <SearchResult 
                    choose={openChat}
                    request={value} 
                    users={users} 
                />
            </div>
        </div>
    )
}

export { NewChatPage }