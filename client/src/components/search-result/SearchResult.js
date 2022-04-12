import React from 'react'
import { User } from '../../modules/user/user'
import { UserLabel } from '../user-label'
import styles from './SearchResult.module.css'

const SearchResult = ({ request, users, choose }) => {
    const user = User.get()

    const filteredUsers = users.filter(candidate => candidate !== user.login)

    return (
        <div className={styles.SearchResult}>
            {filteredUsers.map((user, index) => (
                <UserLabel 
                    onClick={() => choose(user)}
                    user={user} 
                    key={index} 
                />
            ))}

            {!filteredUsers.length && request.trim() && (
                <div className={styles.NoResult}>
                    Users are not found on request {request}
                </div>
            )}
        </div>
    )
}

export { SearchResult }