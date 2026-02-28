import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import DestinationDetails from './pages/DestinationDetails'
import Itinerary from './pages/Itinerary'

function App() {
  return (
    <BrowserRouter>

      {/* 
        ACCESSIBILITY: Skip navigation link.
        This is the very first focusable element on the page.
        When a keyboard user presses Tab, this is the first thing
        they land on. Pressing Enter jumps them straight to the
        main content, skipping the navbar links entirely.
        It is visually hidden using sr-only but appears when focused.
        Without this, keyboard users must Tab through every navbar
        link on every page before reaching any content.
      */}
      
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-pink-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* ACCESSIBILITY: header landmark - screen readers use landmarks
          to let users jump between major sections of the page */}
      <Navbar />

      {/* 
        ACCESSIBILITY: main landmark with id matching the skip link href.
        Screen readers announce this as the main content region.
        The id="main-content" is what the skip link above jumps to.
      */}
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destination/:cityCode" element={<DestinationDetails />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </main>

      {/* ACCESSIBILITY: footer landmark - screen readers recognize
          the footer element as a contentinfo landmark */}
      <Footer />

    </BrowserRouter>
  )
}

export default App