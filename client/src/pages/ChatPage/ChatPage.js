import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { User } from '../../modules/user/user'
import { Message } from '../../components/message/index'
import './ChatPage.css'

const ChatPage = ({ activeChat, setActiveChat }) => {
    const user = User.get()
    const opponent = activeChat.users.filter(login => login !== user.login)[0]

    const [newMessageText, setNewMessageText] = useState('')
    const [messages, setMessages] = useState(activeChat.messages)

    const MessageBoxElement = useRef(null)

    function scrollChat() {
        const chatBox = MessageBoxElement.current
        chatBox.scrollTop = chatBox.scrollHeight
    }

    useEffect(() => {
        scrollChat()
    }, [])

    useEffect(() => {
        scrollChat()    
    }, [messages])

    return (
        <div className='chat-page'>
            <header className='chat-page__header'>
                <button className='chat-page__exit-button'>
                    <FontAwesomeIcon icon={ faArrowLeft } />
                </button>
                <div className='chat-page__login'>
                    {opponent}
                </div>
            </header>
            <div className='chat-page__messages' ref={MessageBoxElement}>
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
                <textarea 
                    className='chat-page__input' 
                    placeholder='Message...'
                    wrap='soft' 
                    value={newMessageText}
                    onChange={(e) => {
                        setNewMessageText(e.target.value)
                    }}
                />
                {/\S/.test(newMessageText) && 
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