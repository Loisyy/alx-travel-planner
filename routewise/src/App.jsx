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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destination/:cityCode" element={<DestinationDetails />} />
        <Route path="/itinerary" element={<Itinerary />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}


export default App
