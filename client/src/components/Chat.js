import React from 'react'

const Chat = ({login, messages}) => {
    return (
        <div className='chat'>
            {login}
            {messages.map((message, index) => (
                <div key={index}>{message.text}</div>
            ))}
        </div>
    )
}

export default Chat