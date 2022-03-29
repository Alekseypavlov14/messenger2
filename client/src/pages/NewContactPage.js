import React, { useState } from 'react'
import HttpController from '../http/Http.controller'

const NewContactPage = ({ setActiveChat }) => {
    const [contacts, setContacts] = useState([])

    return (
        <div className='new-contact-page'>
            <div className='new-contact-page__search'>
                <input 
                    className='new-contact-page__search__input' 
                    type='text' 
                    maxLength='20'
                    onChange={async (e) => {
                        if (e.target.value.trim()) {
                            HttpController.post('/contact/add', {
                                template: e.target.value
                            }).then(data => {
                                setContacts(data)
                            })
                        } else {
                            setContacts([])
                        }
                    }}
                />
            </div>

            <div className='new-contact-page__results'>
                {contacts.map((contact, index) => (
                    <div 
                        key={index} 
                        className='' 
                        onClick={() => {
                            setActiveChat({
                                login: contact.login, 
                                messages: []
                            })
                        }}
                    >
                        {contact.login}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewContactPage