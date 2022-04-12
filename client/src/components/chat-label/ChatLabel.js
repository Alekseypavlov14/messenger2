import React from 'react'
import { User } from '../../modules/user/user'
import './ChatLabel.css'

const ChatLabel = ({ chat, onClick }) => {
    const user = User.get()
    const contactLogin = chat.users.filter(contact => contact !== user.login)[0]

    return (
        <div className='chat' onClick={onClick}>
            {contactLogin}
        </div>
    )
}

export { ChatLabel }