import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Message from '../components/Message'
import './../styles/ChatPage.css'

const ChatPage = ({ chat, onClose, ws }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [newMessageText, setNewMessageText] = useState('')

    const [messages, setMessages] = useState(chat.messages.sort((a, b) => {
        return new Date(a.time) - new Date(b.time)
    }))

    const MessageBoxElement = useRef(null)

    function scrollChat() {
        MessageBoxElement.current.scrollTop = MessageBoxElement.current.scrollHeight
    }

    ws.onmessage = (message) => {
        message = JSON.parse(message.data)

        switch (message.event){
            case 'message/send':
                setMessages(messages => messages.concat(message.message))
                break

            default: console.log('DEFAULT CASE')
        }
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
                <button className='chat-page__exit-button' onClick={onClose}>
                    <FontAwesomeIcon icon={ faArrowLeft } />
                </button>
                <div className='chat-page__login'>
                    {chat.login}
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
                        onClick={async (e) => {
                            const newMessage = {
                                from: user.login,
                                to: chat.login,
                                isRead: false,
                                isSend: false,
                                time: Date.now(),
                                text: newMessageText.trim()
                            }

                            ws.send(JSON.stringify({
                                event: 'message/send',
                                message: newMessage
                            }))
                            
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