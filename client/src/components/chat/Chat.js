import React from 'react'
import { User } from '../../modules/user/user'
import './Chat.css'

const Chat = ({users, onClick}) => {
    const user = User.get()
    const contactLogin = users.filter(contact => contact !== user.login)[0]

    return (
        <div className='chat' onClick={onClick}>
            {contactLogin}
        </div>
    )
}

export default Chat