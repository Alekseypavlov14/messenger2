import React, { useState, useRef, useEffect } from 'react'
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getOpponent, scroll } from './ChatPage.model'
import { Messages } from '../../components/messages'
import { User } from '../../modules/user/user'
import { useExit } from '../../hooks/useExit'
import './ChatPage.css'

const ChatPage = ({ activeChat, setActiveChat }) => {
    useExit(activeChat)

    const user = User.get()
    const opponent = getOpponent(activeChat.users)

    const [newMessageText, setNewMessageText] = useState('')
    const [messages, setMessages] = useState(activeChat.messages)
    const MessageBoxElement = useRef(null)

    useEffect(() => {
        scroll(MessageBoxElement.current)
    }, [messages])

    return (
        <div className='chat-page'>
            <header className='chat-page__header'>
                <button 
                    className='chat-page__exit-button'
                    onClick={() => setActiveChat(null)}
                >
                    <FontAwesomeIcon icon={ faArrowLeft } />
                </button>
                <div className='chat-page__login'>
                    {opponent}
                </div>
            </header>

            <div 
                className='chat-page__messages' 
                ref={MessageBoxElement}
            >
                <Messages messages={messages} />
            </div>

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