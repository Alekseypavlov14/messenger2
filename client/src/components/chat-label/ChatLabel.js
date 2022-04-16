import React from 'react'
import { useNavigate } from 'react-router'
import { User } from '../../modules/user/user'
import styles from './ChatLabel.module.css'

const ChatLabel = ({ chat }) => {
    const user = User.get()
    const contactLogin = chat.users.filter(contact => contact !== user.login)[0]

    const navigate = useNavigate()

    return (
        <div 
            className={styles.ChatLabel} 
            onClick={() => {
                navigate('/chat/' + contactLogin)
            }}
        >
            {contactLogin}
        </div>
    )
}

export { ChatLabel }