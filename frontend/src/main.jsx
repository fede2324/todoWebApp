import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { TasksProvider } from './contexts/TasksContext.jsx'
import { AlertProvider } from './contexts/AlertContext.jsx'
import { HomeProvider } from './contexts/HomeContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <HomeProvider>
          <TasksProvider>
            <AlertProvider>
              <App/>
            </AlertProvider>
          </TasksProvider>
        </HomeProvider>
  </AuthProvider>
  </StrictMode>,
)
