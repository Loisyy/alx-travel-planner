import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="bg-gray-900 text-gray-400 py-12 px-8 md:px-16"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

        {/* Brand Section */}
        <div>
          <Link
            to="/"
            aria-label="RouteWise home page"
            className="flex items-center gap-1 mb-4"
          >
            <span aria-hidden="true" className="text-pink-500 text-xl">🤳</span>
            <span className="font-bold text-xl text-white">RouteWise</span>
          </Link>
          <p className="text-sm leading-relaxed">
            Turning every destination into an experience worth remembering,
            guiding you confidently from where you are to where you dream to be.
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick links">
          <h2 className="text-white font-semibold mb-4">Quick Links</h2>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link to="/" className="hover:text-pink-500">Home</Link></li>
            <li><Link to="/destinations" className="hover:text-pink-500">Destinations</Link></li>
            <li><Link to="/itinerary" className="hover:text-pink-500">My Itinerary</Link></li>
            <li><Link to="/blog" className="hover:text-pink-500">Blog</Link></li>
          </ul>
        </nav>

        {/* Support Links */}
        <nav aria-label="Support links">
          <h2 className="text-white font-semibold mb-4">Support</h2>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="#" className="hover:text-pink-500">FAQ</a></li>
            <li><a href="#" className="hover:text-pink-500">Contact Us</a></li>
            <li><a href="#" className="hover:text-pink-500">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-pink-500">Terms of Service</a></li>
          </ul>
        </nav>

        {/* Social Links */}
        <div>
          <h2 className="text-white font-semibold mb-4">Follow Us</h2>
          <ul role="list" className="flex gap-4 text-2xl">
            <li>
              <a
                href="#"
                aria-label="Follow us on Twitter, opens in new tab"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500"
              >
                <span aria-hidden="true">🛩️</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="Follow us on Facebook, opens in new tab"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500"
              >
                <span aria-hidden="true">📘</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="Follow us on Instagram, opens in new tab"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500"
              >
                <span aria-hidden="true">🚗</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="Subscribe to our YouTube channel, opens in new tab"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500"
              >
                <span aria-hidden="true">🏠</span>
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Separator + Copyright */}
      <div
        role="separator"
        className="border-t border-gray-700 pt-6 text-center text-sm"
      >
        <p
          aria-label={`Copyright ${new Date().getFullYear()} RouteWise. All rights reserved.`}
        >
          © {new Date().getFullYear()} RouteWise. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer