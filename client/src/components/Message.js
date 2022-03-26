import React from 'react'
import './../styles/Message.css'

const Message = ({ message, type }) => {
    const className = `message message-${type}`

    return (
        <div className={className}>
            {message.text}
        </div>
    )
}

export default Message