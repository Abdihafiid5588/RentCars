
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import BookingPage from './pages/bookingPage'
import App from './App'
import Login from './pages/login'
import { BrowserRouter } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'

createRoot(document.getElementById('root')).render(
 
  <AdminDashboard/>
  
)
