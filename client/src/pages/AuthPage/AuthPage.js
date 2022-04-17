import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Auth from '../../modules/auth/Auth.controller'
import './Auth.css'

const AuthPage = ({ type }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function authHandler() {
        if (type === 'login') {
            await Auth.login(login, password)
        } else {
            await Auth.register(login, password)
        }
        navigate('/')
    }

    function changeLoginHandler(e) {
        setLogin(e.target.value)
    }

    function changePasswordHandler(e) {
        setPassword(e.target.value)
    }

    return (
        <div className='auth'>
            <div className='auth__container'>
                <div className='auth__title'>
                    {type === 'login' ? 'Login' : 'Register'}
                </div>

                <div className='auth__form'>
                    <div className='auth__field'>
                        <div className='auth__field__text'>Login</div>
                        <input 
                            type='text' 
                            className='auth__field__input browser-default' 
                            placeholder='Login...' 
                            onChange={changeLoginHandler}
                        />
                    </div>
                    <div className='auth__field'>
                        <div className='auth__field__text'>Password</div>
                        <input 
                            type='password' 
                            className='auth__field__input  browser-default' 
                            placeholder='Password...' 
                            onChange={changePasswordHandler}
                        />
                    </div>

                    <button
                        className='auth__button'
                        onClick={authHandler}
                    >
                        {type === 'login' ? 'Login' : 'Register'}
                    </button>
                </div>

                <div className='auth__footer'>
                    <hr />
                    {type === 'register' ? (
                        <div className='auth__footer__text'>
                            If you have an account, just <Link className='auth__footer__text__link' to='/login'>login</Link>
                        </div>
                    ) : (
                        <div className='auth__footer__text'>
                            Don`t have an account, just <Link className='auth__footer__text__link' to='/register'>register</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export { AuthPage }