import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ItineraryProvider } from './context/ItineraryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ItineraryProvider>
      <App />
    </ItineraryProvider>
  </StrictMode>,
)