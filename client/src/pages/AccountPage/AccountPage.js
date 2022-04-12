import React, { useState } from 'react'
import { deleteAccount, leaveAccount } from './AccountPage.model'
import { ExitButton } from './../../components/exit-button/index'
import { User } from './../../modules/user/user'
import './AccountPage.css'

const AccountPage = () => {
    const user = User.get()
    const [login, setLogin] = useState(user.login)

    function changeHandler(e) {
        setLogin(e.target.value)
    }

    return (
        <div className='account'>
            <div className='account__header'>
                <div className='account__title'>
                    <ExitButton className='account__title__exit-button'/>
                    <div className='account__title__login'>
                        {user.login}
                    </div>
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
                        value={login}
                        type='text'
                        disabled
                    />
                </div>
            </div>

            <div className='account__danger-zone'>
                <div className='account__exit'>
                    <button 
                        className='account__exit-button'
                        onClick={() => leaveAccount()}
                    >
                        Leave from the account
                    </button>
                </div>

                <div className='account__delete'>
                    <button 
                        className='account__delete-button'
                        onClick={() => deleteAccount(user)}
                    >
                        Delete the account 
                    </button>
                </div>
            </div>
        </div>
    )
}

export { AccountPage }