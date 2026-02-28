import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ItineraryProvider } from './context/ItineraryContext.jsx'

/* 
  ACCESSIBILITY: HelmetProvider enables us to set unique page titles
  on each page. Screen reader users rely on the page title to know
  where they are — without it every page would be announced the same.
  Install with: npm install react-helmet-async
*/
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ACCESSIBILITY: HelmetProvider wraps everything so any page
        can use the Helmet component to set its own document title */}
    <HelmetProvider>
      <ItineraryProvider>
        <App />
      </ItineraryProvider>
    </HelmetProvider>
  </StrictMode>,
)