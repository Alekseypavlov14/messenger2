import React from 'react'

const Candidate = ({ candidate, onClick }) => {
    return (
        <div 
            className='new-contact-page__candidate'
            onClick={onClick}
        >
            {candidate.login}
        </div>
    )
}

export { Candidate }