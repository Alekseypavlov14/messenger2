import React, { useState } from 'react'
import './../styles/account.css'

const AccountPage = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [login, setLogin] = useState(user.login)
 
    function changeHandler(e) {
        setLogin(e.target.value)
    }

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
                        id='#login-input'
                        type='text'
                        value={login}
                        onChange={changeHandler}
                    />
                </div>
            </div>
        </div>
    )
}

export default AccountPage