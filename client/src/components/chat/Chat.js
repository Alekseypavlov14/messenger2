import React from 'react'
import './../../styles/Chat.css'

const Chat = ({login, messages, onClick}) => {
    return (
        <div className='chat' onClick={onClick}>
            {login}
        </div>
    )
}

export default Chat