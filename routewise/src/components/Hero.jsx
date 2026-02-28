import heroRoute from "../assets/images/hero-route.jpg"

function Hero() {
  return (
    <div
      className="min-h-[520px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroRoute})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative flex flex-col md:flex-row min-h-[520px]">

        {/* Left Side - Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 text-white">
          <p className="text-sm mb-2">Plan Your Next Move</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Your Adventure <br /> Starts with <br /> RouteWise
          </h1>
          <p className="text-sm mb-8 max-w-sm">
            Turning every destination into an experience worth remembering,
            guiding you confidently from where you are to where you dream to be
          </p>
          <button className="bg-white text-gray-800 font-semibold px-6 py-3 rounded w-fit hover:bg-gray-100">
            Discover more
          </button>
        </div>

        {/* Right Side - visible on desktop only */}
        <div className="hidden md:flex w-1/2 items-center justify-center py-12">
          <img
            src={heroRoute}
            alt="Travel"
            className="w-full md:w-[80%] rounded-xl shadow-xl object-cover max-h-[400px]"
          />
        </div>

      </div>
    </div>
  )
}

export default Hero