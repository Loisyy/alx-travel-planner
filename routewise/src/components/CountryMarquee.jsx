const countries = [
  { name: "Norway", code: "NO", continent: "Europe", capital: "Oslo", currency: "NOK", tagline: "Land of the Midnight Sun", color: "#1a3a5c" },
  { name: "Portugal", code: "PT", continent: "Europe", capital: "Lisbon", currency: "EUR", tagline: "Where the sea begins", color: "#8b1a1a" },
  { name: "Turkey", code: "TR", continent: "Asia/Europe", capital: "Ankara", currency: "TRY", tagline: "Where two worlds meet", color: "#c0392b" },
  { name: "USA", code: "US", continent: "Americas", capital: "Washington D.C.", currency: "USD", tagline: "Coast to coast wonder", color: "#1a2a6c" },
  { name: "Venezuela", code: "VE", continent: "Americas", capital: "Caracas", currency: "VES", tagline: "Angel Falls & beyond", color: "#c8a217" },
  { name: "Ireland", code: "IE", continent: "Europe", capital: "Dublin", currency: "EUR", tagline: "Forty shades of green", color: "#1a5c2a" },
  { name: "Japan", code: "JP", continent: "Asia", capital: "Tokyo", currency: "JPY", tagline: "Tradition meets tomorrow", color: "#c0392b" },
  { name: "Brazil", code: "BR", continent: "Americas", capital: "Brasília", currency: "BRL", tagline: "Soul of South America", color: "#1a6622" },
  { name: "Morocco", code: "MA", continent: "Africa", capital: "Rabat", currency: "MAD", tagline: "Gateway to the Sahara", color: "#8b2500" },
  { name: "Australia", code: "AU", continent: "Oceania", capital: "Canberra", currency: "AUD", tagline: "Wild & wide open", color: "#003580" },
  { name: "Italy", code: "IT", continent: "Europe", capital: "Rome", currency: "EUR", tagline: "Art, food & la dolce vita", color: "#1a6622" },
  { name: "Thailand", code: "TH", continent: "Asia", capital: "Bangkok", currency: "THB", tagline: "Land of smiles", color: "#2c3e7a" },
  { name: "Egypt", code: "EG", continent: "Africa", capital: "Cairo", currency: "EGP", tagline: "Cradle of civilisation", color: "#c8861a" },
  { name: "Canada", code: "CA", continent: "Americas", capital: "Ottawa", currency: "CAD", tagline: "Vast, wild & welcoming", color: "#c0392b" },
  { name: "Greece", code: "GR", continent: "Europe", capital: "Athens", currency: "EUR", tagline: "Myths, isles & olive groves", color: "#1a4a8a" },
  { name: "India", code: "IN", continent: "Asia", capital: "New Delhi", currency: "INR", tagline: "A billion stories waiting", color: "#e67e22" },
  { name: "New Zealand", code: "NZ", continent: "Oceania", capital: "Wellington", currency: "NZD", tagline: "Middle-earth is real", color: "#1a3a5c" },
  { name: "South Africa", code: "ZA", continent: "Africa", capital: "Pretoria", currency: "ZAR", tagline: "The rainbow nation", color: "#1a6622" },
  { name: "Iceland", code: "IS", continent: "Europe", capital: "Reykjavik", currency: "ISK", tagline: "Fire, ice & aurora", color: "#2c5f8a" },
  { name: "Mexico", code: "MX", continent: "Americas", capital: "Mexico City", currency: "MXN", tagline: "Ancient sun & vibrant life", color: "#1a6622" },
]

const row1 = countries.slice(0, 10)
const row2 = countries.slice(10, 20)

function CountryCard({ country }) {
  return (
    <div
      className="flex-shrink-0 flex w-[280px] h-28 bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-opacity-100 transition-all duration-200"
      style={{ "--accent": country.color, borderColor: "transparent" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = country.color}
      onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
      role="listitem"
      aria-label={`${country.name} — ${country.tagline}`}
    >
      {/* Flag image */}
      <div className="w-[100px] min-w-[100px] relative overflow-hidden" style={{ background: country.color }}>
        <img
          src={`https://flagcdn.com/w160/${country.code.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/w320/${country.code.toLowerCase()}.png 2x`}
          alt={`Flag of ${country.name}`}
          className="w-full h-full object-cover block"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between p-3 min-w-0">
        <span className="text-[9.5px] font-medium tracking-wider uppercase text-[#0099BB] bg-[#0099BB]/10 px-2 py-0.5 rounded-full self-start">
          {country.continent}
        </span>
        <h3 className="font-bold text-base text-gray-900 truncate my-0.5">{country.name}</h3>
        <p className="text-[11px] text-gray-400 italic truncate mb-1">{country.tagline}</p>
        <div className="flex gap-2.5 text-[10.5px] text-gray-400">
          <span className="truncate">🏛 {country.capital}</span>
          <span className="truncate">💱 {country.currency}</span>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ items, direction = "left", speed = 35 }) {
  const doubled = [...items, ...items]
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right"

  return (
    <div
      className="overflow-hidden mb-0"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)"
      }}
      role="list"
      aria-label="Countries"
    >
      <style>{`
        @keyframes marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .animate-marquee-left { animation: marquee-left ${speed}s linear infinite; }
        .animate-marquee-right { animation: marquee-right ${speed}s linear infinite; }
        .marquee-wrap:hover .animate-marquee-left,
        .marquee-wrap:hover .animate-marquee-right { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left, .animate-marquee-right { animation: none; }
        }
      `}</style>
      <div className={`marquee-wrap flex gap-3.5 w-max ${animClass}`}>
        {doubled.map((country, i) => (
          <CountryCard key={`${country.code}-${i}`} country={country} />
        ))}
      </div>
    </div>
  )
}

function CountryMarquee() {
  return (
    <section className="bg-[#fcf6f6] py-14 pb-12 overflow-hidden" aria-label="Browse destinations by country">
      <div className="text-center mb-10 px-6">
        <h2 className="text-sm font-medium tracking-[0.18em] uppercase text-[#0099BB]">
          Explore the world
        </h2>
      </div>
      <div className="flex flex-col gap-3.5">
        <MarqueeRow items={row1} direction="left" speed={40} />
        <MarqueeRow items={row2} direction="right" speed={36} />
      </div>
    </section>
  )
}

export default CountryMarquee