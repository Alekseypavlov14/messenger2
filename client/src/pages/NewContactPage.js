import React, { useState } from 'react'
import HttpController from '../http/Http.controller'
import './../styles/NewChatPage.css'

const NewContactPage = ({ setActiveChat }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [candidates, setCandidates] = useState([])

    function searchHandler(e) {
        const value = e.target.value.trim()
        if (!value) setCandidates([])
        
        HttpController.post('/contact/add', {
            template: value
        }).then(data => {
            setCandidates(data)
        })
    }

    return (
        <div className='new-contact-page'>
            <div className='new-contact-page__search'>
                <input 
                    className='new-contact-page__search__input' 
                    type='text' 
                    onChange={searchHandler}
                />
            </div>

            <div className='new-contact-page__results'>
                {candidates.map((candidate, index) => {
                    if (candidate.login === user.login) return false
                    return (
                        <div 
                            className='new-contact-page__candidate'
                            key={index} 
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
                })}
            </div>
        </div>
    )
}

export default NewContactPage