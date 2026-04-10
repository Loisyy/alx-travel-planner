import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

function RouteLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 5000 3000"
      width="48"
      height="48"
      style={{ display: "block" }}
    >
      <path
        d="m3455.7 1085.2c-3.78 1.86-7.46 3.5-11 4.9l-308.64 117.11-176.51 526.17-132.96 50.35 10.48-103.5 37.61-371.17-347.37 121.63-75.25 195.19-88.83 35.08 10.76-178.78c-101.36 31.15-239.31 60.47-354.51 73.41-41.71 4.69-80.43 7.23-113.37 6.93-95.23-0.87-216.12-20.37-314.36-66.55-26.29-12.36-48.9-25.41-65.27-39.81-96.18-75.81-122.77-196.33-88.26-290.24 32.28-87.87 92.79-143.53 122.23-166.56 7.09-31.88 15.75-64.65 26.02-98.52 6.47-21.32 13.56-43.07 21.29-65.33 163.31-425.64 600.83-606.68 892.57-600.65 291.18-6.02 727.56 174.31 891.61 598.16-10.27 2.46-19.89 5.35-28.46 8.59l-295.12 109.44-4.24-1.28c-93.15-214.42-311.36-364.89-565.68-364.89-339.02 0-613.85 267.36-613.85 597.17 0 82.55 17.21 161.17 48.33 232.68-9.04 0.29-18.24 0.45-27.59 0.45-67.64 0-128.91-8.65-187.24-26.44-56.66-17.29-96.21-41.04-122.19-66.35-64.34-63.14-51.04-236.35-51.04-236.35v-0.03c-29.15 31.7-56.09 84.62-53.48 157.4 1.57 43.44 21.95 88.62 63.64 127.6 33.77 31.58 81.52 59.1 144.56 78.33 97.48 29.73 188.01 31.97 264.8 27.34 32.86-1.98 63.19-5.23 90.49-8.11 57.31-6.05 125.87-15.81 226.13-57.94 20.46-8.59 40.69-17.86 62.84-28.91l-140.74-121.91 91.66-36.78 209.29 69.95c0.2-0.12 0.41-0.24 0.61-0.36 197.45-104.67 265.89-142 265.89-142l-342.84-231.4 138.04-53.74 504.66 152.38 16.54-6.14 298.77-110.8c7.31-2.79 16.25-5.36 26.19-7.54 54.63-11.91 139.93-11.51 157.65 33.87 24.3 50.88-56.39 129.73-113.86 157.95z"
        fill="#FF7F7F"
      />
      <path
        d="m3273 1771.3c-110.88 195.4-316.07 455.96-502.66 680.33-101.91 122.55-200.58 237.05-269.99 317.85-69.41-80.8-168.08-195.31-269.99-317.85-186.58-224.36-391.78-484.93-502.66-680.33-40.75-68.59-75.02-132.72-102.76-194.33 19.35 6.56 38.15 12.05 55.21 16.55 75.43 19.96 157.58 31.76 225.38 32.38 1.95 0.01 3.91 0.03 5.89 0.03 47.6-0.01 103.51-4.96 161.84-13.15 62.57 58.49 137.84 104.2 221.41 132.8 83.57-28.6 158.84-74.31 221.41-132.8 58.33 8.19 114.24 13.14 161.84 13.15 1.98 0 3.94-0.02 5.89-0.03 67.8-0.62 149.95-12.42 225.38-32.38 17.06-4.5 35.86-9.99 55.21-16.55-27.74 61.61-62.01 125.74-102.76 194.33z"
        fill="#FF7F7F"
      />
    </svg>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const navLinks = [
    { to: "/", label: "Destination" },
    { to: "/booking", label: "Booking" },
    { to: "/flights", label: "Flight" },
    { to: "/itinerary", label: "Itinerary" },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Only kept for ::after pseudo-element — can't do this in Tailwind */}
      <style>{`
        .rw-active-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 2.5px;
          background: #FF7F7F;
          border-radius: 99px;
        }
      `}</style>

      <header role="banner">

        {/* ── Navbar ── */}
        <nav
          aria-label="Main navigation"
          className={`fixed top-0 left-0 right-0 z-[1000] font-[Inter,sans-serif] transition-all duration-300 ${
            scrolled
              ? "bg-white/[0.92] backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.07)]"
              : "bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          }`}
        >
          <div className="flex items-center justify-between px-8 h-16 max-w-[1280px] mx-auto max-[768px]:px-5">

            {/* Logo */}
            <Link
              to="/"
              aria-label="RouteWise home"
              className="flex items-center no-underline shrink-0"
              style={{ gap: 0 }}
            >
              <span className="-mr-3"><RouteLogo /></span>
              <span
                className="text-xl font-extrabold tracking-tight"
                style={{ color: "#333333", fontFamily: "Poppins, sans-serif", fontStyle: "oblique 20deg", letterSpacing: "-0.02em" }}
              >
                RouteWise
              </span>
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0" role="list">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    aria-current={isActive(to) ? "page" : undefined}
                    className={`relative no-underline text-sm font-medium px-3.5 py-1.5 rounded-lg transition-colors duration-200
                      ${isActive(to)
                        ? "text-[#FF7F7F] font-semibold rw-active-link"
                        : "text-gray-600 hover:text-[#FF7F7F] hover:bg-[#DF6E6E]/[0.06]"
                      }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/signin"
                className="no-underline text-sm font-medium text-gray-600 px-4 py-[7px] rounded-lg hover:text-[#FF7F7F] hover:bg-[#DF6E6E]/[0.06] transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="no-underline text-sm font-semibold text-white bg-[#FF7F7F] px-5 py-2 rounded-full shadow-[0_2px_10px_rgba(255,127,127,0.3)] hover:shadow-[0_4px_18px_rgba(255,127,127,0.4)] hover:-translate-y-px transition-all duration-200"
              >
                Sign Up
              </Link>
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="rw-mobile-menu"
              className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 rounded-lg hover:bg-black/5 transition-colors duration-200"
            >
              <span
                aria-hidden="true"
                className={`block w-[22px] h-0.5 bg-gray-900 rounded-full transition-transform duration-300 origin-center ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`block w-[22px] h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`block w-[22px] h-0.5 bg-gray-900 rounded-full transition-transform duration-300 origin-center ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>

          </div>
        </nav>

        {/* ── Mobile drawer ── */}
        <div
          id="rw-mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          className={`fixed top-16 left-0 right-0 z-[999] bg-white/[0.97] backdrop-blur-xl border-t border-black/[0.06] px-6 pt-4 pb-6 flex flex-col gap-0.5 shadow-[0_16px_40px_rgba(0,0,0,0.1)] transition-all duration-[250ms] ${
            menuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              aria-current={isActive(to) ? "page" : undefined}
              className={`no-underline text-[15px] font-medium px-4 py-3 rounded-[10px] flex items-center justify-between transition-colors duration-200 ${
                isActive(to)
                  ? "text-[#FF7F7F] font-semibold bg-[#DF6E6E]/[0.06]"
                  : "text-gray-600 hover:text-[#FF7F7F] hover:bg-[#DF6E6E]/[0.06]"
              }`}
            >
              {label}
              {isActive(to) && (
                <span aria-hidden="true" className="text-[#FF7F7F] text-xs">●</span>
              )}
            </Link>
          ))}

          <div className="h-px bg-black/[0.06] my-2" role="separator" />

          <div className="flex flex-col gap-2 pt-1">
            <Link
              to="/signin"
              className="no-underline text-[15px] font-medium text-gray-600 px-4 py-3 rounded-[10px] text-center border border-black/10 hover:text-[#FF7F7F] hover:border-[#FF7F7F] transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="no-underline text-[15px] font-semibold text-white bg-[#FF7F7F] px-4 py-[13px] rounded-full text-center shadow-[0_2px_12px_rgba(255,127,127,0.3)] hover:bg-[#DF6E6E] transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>

      </header>

      {/* Spacer so page content sits below fixed navbar */}
      <div className="h-16" aria-hidden="true" />
    </>
  )
}

export default Navbar