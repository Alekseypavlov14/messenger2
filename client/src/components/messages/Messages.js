import React from 'react'
import { User } from './../../modules/user/user'
import { Message } from './../message/index'

const Messages = ({ messages, className }) => {
    const user = User.get()

    return (
        <div className={className}>
            {messages.map((message, index) => (
                <Message
                    message={message} 
                    key={index} 
                    type={user.login === message.to ?
                        'incoming' : 'outgoing'}
                />
            ))}
        </div>
    )
}

export { Messages }