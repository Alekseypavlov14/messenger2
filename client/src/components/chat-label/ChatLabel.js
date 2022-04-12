import React from 'react'
import { User } from '../../modules/user/user'
import styles from './ChatLabel.module.css'

const ChatLabel = ({ chat, onClick }) => {
    const user = User.get()
    const contactLogin = chat.users.filter(contact => contact !== user.login)[0]

    return (
        <div className={styles.ChatLabel} onClick={onClick}>
            {contactLogin}
        </div>
    )
}

export { ChatLabel }