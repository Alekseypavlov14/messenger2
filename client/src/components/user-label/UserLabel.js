import React from 'react'
import styles from './UserLabel.module.css'

const UserLabel = ({ login, onClick }) => {
    return (
        <div 
            className={styles.Message}
            onClick={onClick}
        >
            {login}
        </div>
    )
}

export { UserLabel }