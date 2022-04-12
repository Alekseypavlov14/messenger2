/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useActiveChat } from '../../hooks/useActiveChat'
import { http } from '../../modules/http/Http.controller'
import { UserLabel } from '../../components/user-label/index'
import { User } from '../../modules/user/user'
import './NewChatPage.css'

const NewChatPage = ({ activeChat, setActiveChat }) => {
    useActiveChat(activeChat)
    const user = User.get()
    const [users, setUsers] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        if (!value) return setUsers([])
        
        http.post('/contact/find', {
            template: value,
            user: user
        }).then(data => {
            setUsers(data)
        })
    }, [value])

    function openChat(candidate) {
        http.post('/contact/write', {
            candidate: candidate,
            user: user
        }).then(data => {
            setActiveChat(data.chat)
        })
    }

    return (
        <div className='new-chat-page'>
            <div className='new-chat-page__search'>
                <input 
                    className='new-chat-page__search__input' 
                    onChange={e => setValue(e.target.value)}
                    placeholder='Search...'
                    type='text' 
                />
            </div>

            <div className='new-chat-page__results'>
                {users.map((candidate, index) => {
                    if (candidate.login === user.login) return false
                    return (
                        <UserLabel
                            user={candidate} 
                            onClick={() => openChat(candidate)}
                            key={index}
                        />
                    )
                })}
                
                {users.length === 0 &&
                value !== '' && (
                    <div className='new-chat-page__not-found-holder'>
                        Users not found
                    </div>
                )}
            </div>
        </div>
    )
}

export { NewChatPage }