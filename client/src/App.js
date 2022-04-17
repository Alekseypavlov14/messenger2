import { BrowserRouter } from 'react-router-dom'
import { useViewport } from './hooks/useViewport'
import { Router } from './Router'
import './styles/App.css'

function App() {
  useViewport()

  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  )
}

export default App