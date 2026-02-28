import { Link } from "react-router-dom"


function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-8 md:px-16">


      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">


        {/* Brand */}
        <div>
          <div className="flex items-center gap-1 mb-4">
            <span className="text-pink-500 text-xl">🤳</span>
            <span className="font-bold text-xl text-white">RouteWise</span>
          </div>
          <p className="text-sm leading-relaxed">
            Turning every destination into an experience worth remembering,
            guiding you confidently from where you are to where you dream to be.
          </p>
        </div>


        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link to="/" className="hover:text-pink-500">Home</Link></li>
            <li><Link to="/destinations" className="hover:text-pink-500">Destinations</Link></li>
            <li><Link to="/itinerary" className="hover:text-pink-500">My Itinerary</Link></li>
            <li><Link to="/blog" className="hover:text-pink-500">Blog</Link></li>
          </ul>
        </div>


        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="#" className="hover:text-pink-500">FAQ</a></li>
            <li><a href="#" className="hover:text-pink-500">Contact Us</a></li>
            <li><a href="#" className="hover:text-pink-500">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-pink-500">Terms of Service</a></li>
          </ul>
        </div>


        {/* Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-pink-500">🚗</a>
            <a href="#" className="hover:text-pink-500">🛩️</a>
            <a href="#" className="hover:text-pink-500">🚤</a>
            <a href="#" className="hover:text-pink-500">🚲</a>
          </div>
        </div>


      </div>


      {/* Divider */}
      <div className="border-t border-gray-700 pt-6 text-center text-sm">
        <p>© {new Date().getFullYear()} RouteWise. All rights reserved.</p>
      </div>


    </footer>
  )
}
export default Footer
