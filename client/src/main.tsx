import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './styles/globals.css'
import './styles/navbar.css'
import './styles/forms.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster 
      position='bottom-right'
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "12px",
          background: "#fff",
          color: "#0f172a",
          border: "1px solid #e5e7eb",
        }
      }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
