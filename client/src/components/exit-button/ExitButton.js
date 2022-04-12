import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import React from 'react'

const ExitButton = (props) => {
    return (
        <Link to='/home' {...props}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
    )
}

export { ExitButton }