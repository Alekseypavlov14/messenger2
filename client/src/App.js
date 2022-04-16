import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/register' element={<AuthPage type='register' />}/>
          <Route path='/login' element={<AuthPage type='login' />}/>

          <Route path='/home' element={<HomePage /> } />
          <Route path='/new-chat' element={<NewChatPage /> } />
          <Route path='/chat/:login' element={<ChatPage />} />

          <Route path='/account' element={<AccountPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App