import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import MainRoutes from './routes'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <MainRoutes/>
    </BrowserRouter>
  </AuthProvider>
)
