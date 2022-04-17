import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage/index'
import { HomePage } from './pages/HomePage/index'
import { AccountPage } from './pages/AccountPage/index'
import { NewChatPage } from './pages/NewChatPage'
import { ChatPage } from './pages/ChatPage'
import { User } from './modules/user/user'

const Router = () => {
    const user = User.get()

    if (user) return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<HomePage /> } />
            <Route path='/new-chat' element={<NewChatPage /> } />
            <Route path='/chat/:login' element={<ChatPage />} />
            <Route path='/account' element={<AccountPage />} />
        </Routes>
    )

    return (
        <Routes>
            <Route path='/' element={<Navigate to='/register' />} />
            <Route path='/register' element={<AuthPage type='register' />}/>
            <Route path='/login' element={<AuthPage type='login' />}/>
        </Routes>
    )
}

export { Router }