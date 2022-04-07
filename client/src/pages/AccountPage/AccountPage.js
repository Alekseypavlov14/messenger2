import React, { useEffect, useRef, useState } from 'react'
import './account.css'

const AccountPage = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [login, setLogin] = useState(user.login)

    const LoginInput = useRef(null)
 
    function changeHandler(e) {
        setLogin(e.target.value)
    }

    useEffect(() => {
        if (login !== user.login) {
            LoginInput.current.style.border = '1px solid tomato'
        } else {
            LoginInput.current.style.border = 'none'
        }
    }, [login])

    return (
        <div className='account'>
            <div className='account__header'>
                <div className='account__title'>
                    {user.login}
                </div>
            </div>

            <div className='account__data'>
                <div className='account__data__login'>
                    <label 
                        className='account__data__login__label' 
                        htmlFor='login-input'
                    >
                        Login
                    </label>

                    <input
                        className='account__data__login__input'
                        onChange={changeHandler}
                        id='#login-input'
                        ref={LoginInput}
                        value={login}
                        type='text'
                    />
                </div>
            </div>
        </div>
    )
}

export { AccountPage }