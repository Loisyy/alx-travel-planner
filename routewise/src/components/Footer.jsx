import { Link } from "react-router-dom"

function RouteLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5000 3000" width="48" height="48" style={{ display: "block" }}>
      <path d="m3455.7 1085.2c-3.78 1.86-7.46 3.5-11 4.9l-308.64 117.11-176.51 526.17-132.96 50.35 10.48-103.5 37.61-371.17-347.37 121.63-75.25 195.19-88.83 35.08 10.76-178.78c-101.36 31.15-239.31 60.47-354.51 73.41-41.71 4.69-80.43 7.23-113.37 6.93-95.23-0.87-216.12-20.37-314.36-66.55-26.29-12.36-48.9-25.41-65.27-39.81-96.18-75.81-122.77-196.33-88.26-290.24 32.28-87.87 92.79-143.53 122.23-166.56 7.09-31.88 15.75-64.65 26.02-98.52 6.47-21.32 13.56-43.07 21.29-65.33 163.31-425.64 600.83-606.68 892.57-600.65 291.18-6.02 727.56 174.31 891.61 598.16-10.27 2.46-19.89 5.35-28.46 8.59l-295.12 109.44-4.24-1.28c-93.15-214.42-311.36-364.89-565.68-364.89-339.02 0-613.85 267.36-613.85 597.17 0 82.55 17.21 161.17 48.33 232.68-9.04 0.29-18.24 0.45-27.59 0.45-67.64 0-128.91-8.65-187.24-26.44-56.66-17.29-96.21-41.04-122.19-66.35-64.34-63.14-51.04-236.35-51.04-236.35v-0.03c-29.15 31.7-56.09 84.62-53.48 157.4 1.57 43.44 21.95 88.62 63.64 127.6 33.77 31.58 81.52 59.1 144.56 78.33 97.48 29.73 188.01 31.97 264.8 27.34 32.86-1.98 63.19-5.23 90.49-8.11 57.31-6.05 125.87-15.81 226.13-57.94 20.46-8.59 40.69-17.86 62.84-28.91l-140.74-121.91 91.66-36.78 209.29 69.95c0.2-0.12 0.41-0.24 0.61-0.36 197.45-104.67 265.89-142 265.89-142l-342.84-231.4 138.04-53.74 504.66 152.38 16.54-6.14 298.77-110.8c7.31-2.79 16.25-5.36 26.19-7.54 54.63-11.91 139.93-11.51 157.65 33.87 24.3 50.88-56.39 129.73-113.86 157.95z" fill="#FF7F7F"/>
      <path d="m3273 1771.3c-110.88 195.4-316.07 455.96-502.66 680.33-101.91 122.55-200.58 237.05-269.99 317.85-69.41-80.8-168.08-195.31-269.99-317.85-186.58-224.36-391.78-484.93-502.66-680.33-40.75-68.59-75.02-132.72-102.76-194.33 19.35 6.56 38.15 12.05 55.21 16.55 75.43 19.96 157.58 31.76 225.38 32.38 1.95 0.01 3.91 0.03 5.89 0.03 47.6-0.01 103.51-4.96 161.84-13.15 62.57 58.49 137.84 104.2 221.41 132.8 83.57-28.6 158.84-74.31 221.41-132.8 58.33 8.19 114.24 13.14 161.84 13.15 1.98 0 3.94-0.02 5.89-0.03 67.8-0.62 149.95-12.42 225.38-32.38 17.06-4.5 35.86-9.99 55.21-16.55-27.74 61.61-62.01 125.74-102.76 194.33z" fill="#FF7F7F"/>
    </svg>
  )
}

const TwitterIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
const InstagramIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
const FacebookIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
const YouTubeIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>

const socialLinks = [
  { label: "Twitter / X", icon: <TwitterIcon />, href: "#" },
  { label: "Instagram", icon: <InstagramIcon />, href: "#" },
  { label: "Facebook", icon: <FacebookIcon />, href: "#" },
  { label: "YouTube", icon: <YouTubeIcon />, href: "#" },
]

function Footer() {
  return (
    <footer aria-label="Site footer" className="bg-[#0a0f1a] text-gray-500 pt-16 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0099BB] to-transparent" />

      <div className="max-w-[1200px] mx-auto px-12 sm:px-5">
        <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 mb-12 md:grid-cols-2 md:gap-8 sm:grid-cols-1 sm:gap-7">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-0 no-underline mb-4" aria-label="RouteWise home">
              <div className="-mr-3"><RouteLogo /></div>
              <span className="text-xl font-extrabold text-white italic tracking-tight">RouteWise</span>
            </Link>
            <p className="text-[13.5px] leading-relaxed text-gray-500 mb-6 max-w-[260px]">
              Turning every destination into an experience worth remembering. Plan smarter, travel further.
            </p>
            <p className="text-[12px] font-semibold tracking-widest uppercase text-gray-500 mb-2.5">Stay updated</p>
            <form
              className="flex rounded-xl overflow-hidden border border-white/8"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border-none outline-none px-3.5 py-2.5 text-[13px] text-white placeholder-gray-600 min-w-0"
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="bg-[#FF7F7F] hover:bg-[#df6e6e] border-none text-white px-4 py-2.5 text-[13px] font-semibold cursor-pointer whitespace-nowrap transition-colors duration-200">
                Subscribe
              </button>
            </form>
          </div>

          {/* Explore */}
          <nav aria-label="Quick links">
            <h2 className="text-[13px] font-bold text-white tracking-[0.05em] uppercase mb-4">Explore</h2>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {[{ to: "/", label: "Home" }, { to: "/destinations", label: "Destinations" }, { to: "/flights", label: "Flights" }, { to: "/itinerary", label: "My Itinerary" }].map(({ to, label }) => (
                <li key={to}><Link to={to} className="text-[13.5px] text-gray-500 no-underline hover:text-[#FF7F7F] transition-colors duration-200">{label}</Link></li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="Support links">
            <h2 className="text-[13px] font-bold text-white tracking-[0.05em] uppercase mb-4">Support</h2>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {["FAQ", "Contact Us", "Privacy Policy", "Terms of Service"].map(label => (
                <li key={label}><a href="#" className="text-[13.5px] text-gray-500 no-underline hover:text-[#FF7F7F] transition-colors duration-200">{label}</a></li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <h2 className="text-[13px] font-bold text-white tracking-[0.05em] uppercase mb-4">Follow Us</h2>
            <div className="flex gap-2.5" role="list">
              {socialLinks.map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 bg-white/6 border border-white/8 rounded-xl flex items-center justify-center text-gray-500 no-underline hover:bg-[#FF7F7F] hover:border-[#FF7F7F] hover:text-white hover:-translate-y-0.5 transition-all duration-200"
                  aria-label={`Follow RouteWise on ${label}`}
                  target="_blank"
                  rel="noreferrer"
                  role="listitem"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 py-5 flex items-center justify-between flex-wrap gap-3 sm:flex-col sm:items-start">
          <p className="text-[12.5px] text-gray-600">© {new Date().getFullYear()} RouteWise. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Cookies"].map(label => (
              <a key={label} href="#" className="text-[12.5px] text-gray-600 no-underline hover:text-gray-400 transition-colors duration-200">{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer