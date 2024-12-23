import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './ctx/contextProvider.jsx'
import LogInProvider from './ctx/loginProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <LogInProvider>
    <ContextProvider>
    <App />
    </ContextProvider>
    </LogInProvider>
    </BrowserRouter>
  </StrictMode>,
)
