import React from 'react'
import { Link } from 'react-router-dom'
import './NotFoundPage.css'

const NotFoundPage = () => {
    return (
        <div className='not-found-page'>
            <div className='not-found-page__container'>
                <h2 className='not-found-page__headline'>404 Page</h2>

                <p className='not-found-page__text'>
                    This URL is not correct
                </p>

                <Link 
                    to='/'
                    className='not-found-page__link'
                >
                    Go Back
                </Link>
            </div> 
        </div>
    )
}

export { NotFoundPage }