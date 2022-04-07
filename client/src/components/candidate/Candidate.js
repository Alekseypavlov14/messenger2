import React from 'react'

const Candidate = ({candidate, setActiveChat}) => {
    return (
        <div 
            className='new-contact-page__candidate'
            onClick={() => {
                setActiveChat({
                    login: candidate.login, 
                    messages: []
                })
            }}
        >
            {candidate.login}
        </div>
    )
}

export default Candidate