import React from 'react'
import './Message.css'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Message = ({ message, type }) => {
    const className = `message message-${type}`
    
    const time = new Date(message.time)
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const renderedTime = `${hours}:${minutes}`

    return (
        <div className={className}>
            {message.text}
            <div className='message__footer'>
                <div className='message__footer__time'>
                    {renderedTime}
                </div>
                {type === 'outgoing' && message.isRead && (
                    <FontAwesomeIcon className='message__is-read-icon' icon={faCheckCircle} />
                )}
            </div>
        </div>
    )
}

export { Message }