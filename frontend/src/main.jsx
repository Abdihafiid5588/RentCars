
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import BookingPage from './pages/bookingPage'
import App from './App'
import Login from './pages/login'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <App />
  </BrowserRouter>
  
)
