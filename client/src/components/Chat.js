import React from 'react'
import './../styles/Chat.css'

const Chat = ({login, messages, onClick}) => {
    return (
        <div className='chat' onClick={onClick}>
            {login}
            {/* {messages.map((message, index) => (
                <div key={index}>{message.text}</div>
            ))} */}
        </div>
    )
}

export default Chat