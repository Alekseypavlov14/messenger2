import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import React from 'react'

const ExitButton = () => {
    return (
        <Link to='/home'>
            <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
    )
}

export { ExitButton }