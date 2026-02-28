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

      {/* Skip navigation link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-pink-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Header */}
      <Navbar />

      {/* Main content */}
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destination/:cityCode" element={<DestinationDetails />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

    </BrowserRouter>
  )
}

export default App