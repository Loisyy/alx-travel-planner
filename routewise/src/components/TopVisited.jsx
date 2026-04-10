import { useNavigate } from "react-router-dom"
import romeImg from "../assets/images/rome.jpg"
import parisImg from "../assets/images/paris.jpg"
import englandImg from "../assets/images/england.jpg"
import tokyoImg from "../assets/images/tokyo.jpg"

const destinations = [
  { id: 1, city: "Rome", country: "Italy", cityCode: "FCO", description: "Home to St. Peter's Basilica, the Vatican Museums and the Colosseum.", rating: 5, bestTime: "Apr – Jun, Sep – Oct", image: romeImg },
  { id: 2, city: "Paris", country: "France", cityCode: "PAR", description: "Known for romance, art, haute cuisine and timeless architecture.", rating: 4, bestTime: "Jun – Aug", image: parisImg },
  { id: 3, city: "London", country: "UK", cityCode: "LON", description: "Rich in history, royal traditions, world-class museums and theatre.", rating: 4, bestTime: "May – Sep", image: englandImg },
  { id: 4, city: "Tokyo", country: "Japan", cityCode: "TYO", description: "A bustling metropolis blending tradition with cutting-edge technology.", rating: 5, bestTime: "Mar – May, Sep – Nov", image: tokyoImg },
]


function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[1,2,3,4,5].map(s => (
        <span key={s} aria-hidden="true" className={`text-[13px] ${s <= rating ? "text-[#FFD166]" : "text-gray-200"}`}>★</span>
      ))}
    </div>
  )
}

function TopVisited() {
  const navigate = useNavigate()

  const handleExplore = (dest) => {
    navigate(`/destination/${dest.cityCode}`, {
      state: {
        destination: {
          id: dest.id,
          name: dest.city,
          address: { cityName: dest.city, countryName: dest.country, cityCode: dest.cityCode },
        },
      },
    })
  }

  return (
    <section aria-labelledby="tv-heading" className="bg-white py-[72px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-12 sm:px-5">

        {/* Header */}
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.2em] uppercase text-[#FF7F7F] mb-2" aria-hidden="true">
              ✦ Editor's picks
            </p>
            <h2 id="tv-heading" className="text-[clamp(24px,3.5vw,36px)] font-extrabold text-gray-900 mb-1.5 leading-[1.1]">
              Top Visited
            </h2>
            <p className="text-sm text-gray-400 italic">The most explored destinations on RouteWise</p>
          </div>
          <button
            onClick={() => navigate("/destinations")}
            aria-label="View all destinations"
            className="inline-flex items-center gap-1.5 bg-transparent border border-gray-200 text-gray-600 px-5 py-2.5 rounded-full text-[13px] font-medium cursor-pointer hover:border-[#df6e6e] hover:text-[#df6e6e] hover:bg-pink-50/40 transition-colors duration-200 whitespace-nowrap"
          >
            View All →
          </button>
        </div>

        {/* Grid */}
        <div role="list" aria-label="Top visited destinations" className="grid grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-1">
          {destinations.map((dest, i) => (
            <div key={dest.id} role="listitem">
              <article
                className="rounded-[18px] overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-250 cursor-pointer focus:outline-[3px] focus:outline-[#FF7F7F] focus:outline-offset-2"
                aria-label={`${dest.city}, ${dest.country}`}
                onClick={() => handleExplore(dest)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleExplore(dest) } }}
                tabIndex={0}
              >
                {/* Image */}
                <div className="relative h-[220px] overflow-hidden sm:h-[180px]">
                  <img
                    src={dest.image}
                    alt={`Scenic view of ${dest.city}, ${dest.country}`}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/55" aria-hidden="true" />
                  <span className="absolute top-3.5 left-3.5 bg-[#FF7F7F] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full tracking-[0.05em]" aria-hidden="true">
                    #{i + 1} Top
                  </span>
                  <span className="absolute top-3.5 right-3.5 bg-white/90 text-gray-900 text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm" aria-hidden="true">
                    {dest.country}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-extrabold text-gray-900 leading-[1.1]">{dest.city}</h3>
                    <StarRating rating={dest.rating} />
                  </div>
                  <p className="text-[13px] text-gray-400 leading-[1.5] mb-4 line-clamp-2">{dest.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">
                      Best time: <strong className="text-gray-600 font-semibold">{dest.bestTime}</strong>
                    </span>
                    <button
                      className="bg-[#FF7F7F] hover:bg-[#df6e6e] text-white rounded-full px-5 py-2 text-[13px] font-semibold cursor-pointer hover:scale-105 transition-all duration-200 shadow-[0_2px_10px_rgba(255,127,127,0.25)]"
                      onClick={(e) => { e.stopPropagation(); handleExplore(dest) }}
                      aria-label={`Explore ${dest.city}, ${dest.country}`}
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default TopVisited