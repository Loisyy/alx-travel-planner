import { useState } from "react"
import { Link } from "react-router-dom"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    /*
      ACCESSIBILITY: header element is a landmark that screen readers
      recognize. role="banner" explicitly marks this as the site header.
      relative and z-50 ensure the navbar always sits above other content.
    */
    <header role="banner" className="bg-white shadow-sm relative z-50">

      {/* ACCESSIBILITY: nav element with aria-label distinguishes this
          from other nav elements on the page like footer navigation.
          Screen readers announce "Main navigation" to orient the user. */}
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between px-8 py-4"
      >

        {/* ACCESSIBILITY: aria-label on the logo link describes its
            destination. Without it screen readers would just say "link"
            or read the emoji which is not helpful */}
        <Link
          to="/"
          aria-label="RouteWise home page"
          className="flex items-center gap-1"
        >
          {/* ACCESSIBILITY: aria-hidden hides decorative emoji from
              screen readers — it adds no meaning so we skip it */}
          <span aria-hidden="true" className="text-pink-500 text-xl">📍</span>
          <span className="font-bold text-xl text-pink-500">RouteWise</span>
        </Link>

        {/* ACCESSIBILITY: hidden from screen readers on mobile via
            hidden class. Desktop nav links are straightforward text
            links so no extra aria needed */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-pink-500 focus-visible:text-pink-500"
          >
            Destination
          </Link>
          <Link
            to="/booking"
            className="text-gray-700 hover:text-pink-500 focus-visible:text-pink-500"
          >
            Booking
          </Link>
          <Link
            to="/flights"
            className="text-gray-700 hover:text-pink-500 focus-visible:text-pink-500"
          >
            Flight
          </Link>
          <Link
            to="/itinerary"
            className="text-gray-700 hover:text-pink-500 focus-visible:text-pink-500"
          >
            {/* ACCESSIBILITY: aria-hidden on emoji so screen reader
                just says "Itinerary" not "map emoji Itinerary" */}
            <span aria-hidden="true">🗺️</span> Itinerary
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/signin"
            className="text-gray-700 hover:text-pink-500"
          >
            SignIn
          </Link>
          <Link
            to="/signup"
            className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600"
          >
            SignUp
          </Link>
        </div>

        {/*
          ACCESSIBILITY: aria-label describes what the button does.
          aria-expanded tells screen readers whether the menu is
          currently open or closed — it updates when state changes.
          aria-controls links this button to the menu it controls
          using the menu's id. Together these three attributes give
          screen reader users full context about this button.
        */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {/* ACCESSIBILITY: aria-hidden on the visual bars — the
              button's aria-label already describes the purpose so
              these decorative spans should be ignored by screen readers */}
          <span
            aria-hidden="true"
            className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            aria-hidden="true"
            className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            aria-hidden="true"
            className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>

      </nav>

      {/*
        ACCESSIBILITY: id="mobile-menu" matches aria-controls on the
        button above, creating a programmatic link between them.
        role="navigation" marks this as a navigation landmark.
        aria-label distinguishes it from the desktop nav.
      */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="md:hidden bg-white border-t border-gray-100 px-8 py-6 flex flex-col gap-4"
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-pink-500"
          >
            Destination
          </Link>
          <Link
            to="/booking"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-pink-500"
          >
            Booking
          </Link>
          <Link
            to="/flights"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-pink-500"
          >
            Flight
          </Link>
          <Link
            to="/itinerary"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-pink-500"
          >
            <span aria-hidden="true">🗺️</span> Itinerary
          </Link>

          {/* ACCESSIBILITY: role="separator" marks the visual divider
              as a separator landmark so screen readers understand the
              structure — auth links are separate from nav links */}
          <div
            role="separator"
            className="border-t border-gray-100 pt-4 flex flex-col gap-3"
          >
            <Link
              to="/signin"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-pink-500"
            >
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

    </header>
  )
}

export default Navbar