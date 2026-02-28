import { useState } from "react"
import { Link } from "react-router-dom"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm relative z-50">

      {/* Main Bar */}
      <div className="flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-pink-500 text-xl">🤳</span>
          <span className="font-bold text-xl text-pink-500">RouteWise</span>
        </Link>

        {/* Desktop Nav Links - hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-pink-500">Destination</Link>
          <Link to="/booking" className="text-gray-700 hover:text-pink-500">Booking</Link>
          <Link to="/flights" className="text-gray-700 hover:text-pink-500">Flight</Link>
          <Link to="/itinerary" className="text-gray-700 hover:text-pink-500">🗺️ Itinerary</Link>
        </div>

        {/* Desktop Auth Buttons - hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/signin" className="text-gray-700 hover:text-pink-500">SignIn</Link>
          <Link
            to="/signup"
            className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600"
          >
            SignUp
          </Link>
        </div>

        {/* Hamburger Button - only visible on mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>

      </div>

      {/* Mobile Menu - drops below the main bar */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-8 py-6 flex flex-col gap-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-pink-500">
            Destination
          </Link>
          <Link to="/booking" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-pink-500">
            Booking
          </Link>
          <Link to="/flights" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-pink-500">
            Flight
          </Link>
          <Link to="/itinerary" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-pink-500">
            🗺️ Itinerary
          </Link>
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
            <Link to="/signin" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-pink-500">
              SignIn
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="bg-pink-500 text-white px-5 py-2 rounded-full text-center hover:bg-pink-600"
            >
              SignUp
            </Link>
          </div>
        </div>
      )}

    </nav>
  )
}

export default Navbar