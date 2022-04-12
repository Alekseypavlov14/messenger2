import React from 'react'
import styles from './UserLabel.module.css'

const UserLabel = ({ user, onClick }) => {
    return (
        <div 
            className={styles.Message}
            onClick={onClick}
        >
            {user.login}
        </div>
    )
}

export { UserLabel }