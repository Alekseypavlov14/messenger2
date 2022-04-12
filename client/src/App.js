import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { useViewport } from './hooks/useViewport'
import { AuthPage } from './pages/AuthPage/index'
import { HomePage } from './pages/HomePage/index'
import { AccountPage } from './pages/AccountPage/index'
import { NewChatPage } from './pages/NewChatPage'
import { ChatPage } from './pages/ChatPage'
import Root from './Root'
import './styles/App.css'

function App() {
  useViewport()

  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/register' element={<AuthPage type='register' />}/>
          <Route path='/login' element={<AuthPage type='login' />}/>
          <Route path='/home' element={<HomePage chats={chats} activeChat={activeChat} setActiveChat={setActiveChat} />} />
          <Route path='/new-chat' element={<NewChatPage setChats={setChats} activeChat={activeChat} setActiveChat={setActiveChat}/> } />
          <Route path='/chat' element={<ChatPage activeChat={activeChat} setActiveChat={setActiveChat} />} />
          <Route path='/account' element={<AccountPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App