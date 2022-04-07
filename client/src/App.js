import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useViewport } from './hooks/useViewport'
import { AuthPage } from './pages/AuthPage/index'
import { HomePage } from './pages/HomePage/index'
import { AccountPage } from './pages/AccountPage/index'
import Root from './Root'
import './styles/App.css'

function App() {
  useViewport()

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/register' element={<AuthPage type='register' />}/>
          <Route path='/login' element={<AuthPage type='login' />}/>
          <Route path='/account' element={<AccountPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App