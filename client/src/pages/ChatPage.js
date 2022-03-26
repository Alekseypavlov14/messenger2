import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Message from '../components/Message'
import './../styles/ChatPage.css'

const ChatPage = ({ chat, onClose, onSend }) => {
    const [newMessageText, setNewMessageText] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))

    const [messages, setMessages] = useState(chat.messages.sort((a, b) => {
        return new Date(a.time) - new Date(b.time)
    }))

    return (
        <div className='chat-page'>
            <header className='chat-page__header'>
                <button className='chat-page__exit-button' onClick={onClose}>
                    <FontAwesomeIcon icon={ faArrowLeft } />
                </button>
                <div className='chat-page__login'>
                    {chat.login}
                </div>
            </header>
            <div className='chat-page__messages'>
                {messages.map((message, index) => {
                    return (
                        <Message 
                            message={message} 
                            key={index} 
                            type={user.login === message.to ?
                             'incoming' : 'outgoing'}
                        />
                    )
                })}
            </div>
            <div className='chat-page__input-field'>
                <input 
                    className='chat-page__input' 
                    placeholder='Message...'
                    type='text'
                    value={newMessageText}
                    onChange={(e) => {
                        setNewMessageText(e.target.value)
                    }}
                />
                {/\S/.test(newMessageText) && 
                    <button 
                        className='chat-page__input-field__button'
                        onClick={(e) => {
                            const newMessage = {
                                from: user.login,
                                to: chat.login,
                                isRead: false,
                                isSend: false,
                                time: Date.now(),
                                text: newMessageText.trim()
                            }

                            onSend(newMessage)
                            setMessages(messages => messages.concat(newMessage))
                            setNewMessageText('')
                        }}
                    >
                        <FontAwesomeIcon icon={ faPaperPlane } />
                    </button>
                }
            </div>
        </div>
    )
}

export default ChatPage