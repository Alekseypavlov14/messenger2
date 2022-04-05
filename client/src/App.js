import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useViewport} from './hooks/useViewport'
import AuthPage from './pages/AuthPage'
import Root from './Root'
import Home from './pages/HomePage'
import './styles/App.css'
import AccountPage from './pages/AccountPage'

function App() {
  useViewport()

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<AuthPage type='register' />}/>
          <Route path='/login' element={<AuthPage type='login' />}/>
          <Route path='/account' element={<AccountPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App