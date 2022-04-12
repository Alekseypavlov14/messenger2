import React from 'react'
import './UserLabel.css'

const UserLabel = ({ user, onClick }) => {
    return (
        <div 
            className='new-contact-page__user-label'
            onClick={onClick}
        >
            {user.login}
        </div>
    )
}

export { UserLabel }