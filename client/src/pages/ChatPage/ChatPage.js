import React, { useState } from 'react'
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getOpponent, useChat } from './ChatPage.model'
import { Messages } from './../../components/messages/index'
import { useNavigate } from 'react-router'
import './ChatPage.css'

const ChatPage = () => {
    const navigate = useNavigate()

    const chat = useChat()
    const opponent = getOpponent(chat.users)

    const [newMessageText, setNewMessageText] = useState('')

    return (
        <div className='chat-page'>
            <header className='chat-page__header'>
                <button 
                    className='chat-page__exit-button'
                    onClick={() => navigate('/home')}
                >
                    <FontAwesomeIcon icon={ faArrowLeft } />
                </button>
                <div className='chat-page__login'>
                    {opponent}
                </div>
            </header>

            <Messages 
                className='chat-page__messages' 
                messages={chat.messages} 
            />

            <div className='chat-page__input-field'>
                <textarea 
                    className='chat-page__input' 
                    placeholder='Message...'
                    wrap='soft' 
                    value={newMessageText}
                    onChange={(e) => {
                        setNewMessageText(e.target.value)
                    }}
                />
                
                {newMessageText.trim() && 
                    <button 
                        className='chat-page__input-field__button'
                        onClick={() => {
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

export { ChatPage }