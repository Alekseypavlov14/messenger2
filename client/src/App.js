import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useViewport} from './hooks/useViewport'
import AuthPage from './pages/AuthPage'
import './styles/App.css'
import Root from './Root'
import Home from './pages/HomePage'

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App