import React, { useEffect, useState } from 'react'
import HttpController from '../modules/http/Http.controller'
import Candidate from '../components/Candidate'
import './../styles/NewChatPage.css'

const NewContactPage = ({ setActiveChat }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [candidates, setCandidates] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        if (!value) return setCandidates([])
        
        HttpController.post('/contact/add', {
            template: value
        }).then(data => {
            setCandidates(data)
        })
    }, [value])

    return (
        <div className='new-contact-page'>
            <div className='new-contact-page__search'>
                <input 
                    className='new-contact-page__search__input' 
                    onChange={e => setValue(e.target.value)}
                    type='text' 
                />
            </div>

            <div className='new-contact-page__results'>
                {candidates.map((candidate, index) => {
                    if (candidate.login === user.login) return false
                    return (
                        <Candidate 
                            candidate={candidate} 
                            setActiveChat={setActiveChat} 
                            key={index}
                        />
                    )
                })}
                {candidates.length === 0 &&
                value !== '' && (
                    <div className='new-contact-page__not-found-holder'>
                        Users not found
                    </div>
                )}
            </div>
        </div>
    )
}

export default NewContactPage