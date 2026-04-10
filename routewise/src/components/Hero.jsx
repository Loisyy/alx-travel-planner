import heroRoute from "../assets/images/hero-route.jpg"
import SearchBar from "./SearchBar"
import { useNavigate } from "react-router-dom"

function Hero() {
  const navigate = useNavigate()

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[600px] flex items-stretch overflow-hidden"
      style={{ background: "linear-gradient(120deg, #019FCD 0%, #0288d1 35%, #4DA6FF 100%)" }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-right bg-no-repeat z-0"
        style={{ backgroundImage: `url(${heroRoute})`, opacity: 0.55 }}
      />

      {/* Overlay — fades left to right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(90deg, rgba(1,159,205,0.95) 0%, rgba(1,159,205,0.85) 35%, rgba(1,159,205,0.5) 55%, rgba(1,159,205,0.0) 70%)"
        }}
      />

      {/* Content */}
      <div className="relative z-[2] flex flex-col justify-center w-full max-w-[1100px] mx-auto px-12 py-20 gap-8 md:px-12 sm:px-6 sm:py-14">

        {/* Eyebrow */}
        <p aria-hidden="true" className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/90">
          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
          Plan Your Next Move
        </p>

        {/* Heading */}
        <h1
          id="hero-heading"
          className="font-[Poppins,sans-serif] text-[clamp(36px,5.5vw,64px)] font-extrabold text-white leading-[1.08] tracking-tight max-w-2xl m-0"
          style={{ textShadow: "0 4px 30px rgba(0,80,140,0.4)" }}
        >
          Your Adventure<br />
          Starts with{" "}
          <span className="text-[#FFD166]">RouteWise</span>
        </h1>

        {/* Subtext */}
        <p className="text-[15px] text-white/90 leading-relaxed max-w-md m-0">
          Turning every destination into an experience worth remembering,
          guiding you from where you are to where you dream to be.
        </p>

        {/* Search */}
        <div>
          <SearchBar />

          {/* Popular chips */}
          <div className="flex items-center gap-2 flex-wrap mt-3">
            <span className="text-[11.5px] text-white/75 font-medium">Popular:</span>
            {["Paris", "Tokyo", "Rome", "Bali"].map((city) => (
              <button
                key={city}
                type="button"
                aria-label={`Search for ${city}`}
                onClick={() => navigate(`/destinations?search=${city}`)}
                className="text-[11.5px] text-white/90 bg-white/20 border border-white/35 px-2.5 py-0.5 rounded-full cursor-pointer hover:bg-white/35 transition-colors duration-200"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 pt-2" aria-label="RouteWise at a glance">
          {[
            { num: "20+", label: "Countries" },
            { num: "500+", label: "Destinations" },
            { num: "12k+", label: "Travellers" },
          ].map(({ num, label }, i) => (
            <div key={label} className="flex items-center gap-8">
              {i > 0 && <div className="w-px self-stretch bg-white/30" aria-hidden="true" />}
              <div className="flex flex-col gap-0.5">
                <span className="font-[Poppins,sans-serif] text-[22px] font-extrabold text-white leading-none">{num}</span>
                <span className="text-[11px] text-white/70 tracking-[0.05em] uppercase">{label}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-1.5 opacity-40 sm:hidden" aria-hidden="true">
        <div className="w-5 h-[30px] border border-white/60 rounded-full flex justify-center pt-1">
          <div className="w-0.5 h-1.5 bg-white/80 rounded-full animate-bounce" />
        </div>
        <span className="text-[10px] text-white tracking-[0.15em] uppercase">Scroll</span>
      </div>
    </section>
  )
}

export default Hero