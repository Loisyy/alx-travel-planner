import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { searchFlights } from "../services/amadeus"

function FlightCard({ flight, onBook }) {
  const seg = flight.itineraries?.[0]?.segments?.[0]
  const origin = seg?.departure?.iataCode
  const dest = seg?.arrival?.iataCode
  const depTime = seg?.departure?.at?.split("T")[1]?.slice(0, 5)
  const arrTime = seg?.arrival?.at?.split("T")[1]?.slice(0, 5)
  const duration = flight.itineraries?.[0]?.duration?.replace("PT", "").replace("H", "h ").replace("M", "m")
  const stops = flight.itineraries?.[0]?.segments?.length - 1
  const airline = flight.validatingAirlineCodes?.[0] || "???"
  const price = flight.price?.total
  const currency = flight.price?.currency

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 px-7 py-6 mb-3.5 flex items-center gap-6 shadow-sm hover:shadow-xl hover:border-[#0099BB] hover:-translate-y-0.5 transition-all duration-200 sm:flex-wrap sm:gap-4"
      role="listitem"
      aria-label={`Flight from ${origin} to ${dest}, ${price} ${currency}`}
    >
      {/* Airline badge */}
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0099BB] to-[#0f1923] flex items-center justify-center text-[13px] font-extrabold text-white shrink-0 tracking-[0.05em]" aria-hidden="true">
        {airline}
      </div>

      {/* Route */}
      <div className="flex-1 flex items-center gap-4">
        <div>
          <div className="text-[22px] font-extrabold text-gray-900">{depTime}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">{origin}</div>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0099BB] shrink-0" />
            <div className="flex-1 h-[1.5px] bg-gradient-to-r from-[#0099BB] to-gray-100" />
            <span className="text-[#0099BB] text-base" aria-hidden="true">✈</span>
            <div className="flex-1 h-[1.5px] bg-gradient-to-r from-gray-100 to-[#0099BB]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#0099BB] shrink-0" />
          </div>
          <div className="text-[11px] text-gray-400 font-medium">{duration}</div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${stops === 0 ? "text-green-500 bg-green-50" : "text-[#FF7F7F] bg-red-50"}`}>
            {stops === 0 ? "Direct" : `${stops} stop${stops > 1 ? "s" : ""}`}
          </span>
        </div>
        <div>
          <div className="text-[22px] font-extrabold text-gray-900">{arrTime}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">{dest}</div>
        </div>
      </div>

      {/* Price + book */}
      <div className="text-right shrink-0 sm:text-left sm:flex sm:items-center sm:justify-between sm:w-full">
        <div>
          <div className="text-[10px] text-gray-400 mb-1">per person</div>
          <div className="text-[26px] font-extrabold text-[#FF7F7F] leading-none">{currency} {price}</div>
        </div>
        <button
          className="mt-2 bg-gray-900 hover:bg-[#FF7F7F] text-white rounded-full px-5 py-2 text-[13px] font-semibold transition-colors duration-200 whitespace-nowrap sm:mt-0"
          onClick={() => onBook(flight)}
          aria-label={`Book flight from ${origin} to ${dest} for ${price} ${currency}`}
        >
          Book Now →
        </button>
      </div>
    </div>
  )
}

function Flights() {
  const navigate = useNavigate()
  const [tripType, setTripType] = useState("one-way")
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [depDate, setDepDate] = useState("")
  const [passengers, setPassengers] = useState(1)
  const [sortBy, setSortBy] = useState("price")
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)

  useEffect(() => { document.title = "Flights — RouteWise" }, [])

  const handleSwap = () => { setOrigin(destination); setDestination(origin) }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!origin || !destination || !depDate) return
    setLoading(true); setError(null); setSearched(true); setFlights([])
    try {
      const results = await searchFlights(origin.toUpperCase(), destination.toUpperCase(), depDate, passengers)
      setFlights((results || []).sort((a, b) => parseFloat(a.price?.total) - parseFloat(b.price?.total)))
    } catch { setError("Failed to fetch flights. Please check your airports and try again.") }
    finally { setLoading(false) }
  }

  const handleBook = (flight) => navigate("/booking", { state: { flight, origin, destination, depDate, passengers } })

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === "price") return parseFloat(a.price?.total) - parseFloat(b.price?.total)
    if (sortBy === "duration") return (a.itineraries?.[0]?.duration || "").localeCompare(b.itineraries?.[0]?.duration || "")
    return 0
  })

  const today = new Date().toISOString().split("T")[0]

  const inputCls = "flex items-center gap-2.5 border border-gray-100 rounded-xl px-3.5 py-3 bg-gray-50 focus-within:border-[#0099BB] focus-within:bg-white transition-colors duration-200"
  const fieldInputCls = "border-none outline-none bg-transparent text-[14px] font-medium text-gray-800 w-full placeholder-gray-300"

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div
        className="px-12 pt-14 pb-20 relative overflow-hidden sm:px-5 sm:pt-10 sm:pb-16"
        style={{
          background: "linear-gradient(120deg, rgba(1,159,205,0.95) 0%, rgba(1,159,205,0.85) 50%, rgba(1,159,205,0.5) 70%, rgba(1,159,205,0.0) 90%)"
        }} role="banner"
      >
        <div className="max-w-[900px] mx-auto relative z-10">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/50 mb-3" aria-hidden="true">
            ✈ RouteWise Flights
          </p>
          <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold text-white mb-8 leading-[1.1]">
            Find your next <span className="text-[#fffff]">flight</span>
          </h1>

          {/* Trip toggle */}
          <div className="inline-flex bg-white/10 rounded-full p-1 mb-6 gap-1" role="group" aria-label="Trip type">
            {["one-way", "return"].map(type => (
              <button
                key={type}
                onClick={() => setTripType(type)}
                aria-pressed={tripType === type}
                className={`text-[13px] font-medium px-[18px] py-[7px] rounded-full border-none cursor-pointer transition-all duration-200 ${
                  tripType === type ? "bg-[#FF7F7F] text-white shadow-[0_2px_10px_rgba(255,127,127,0.4)]" : "bg-transparent text-white/60"
                }`}
              >
                {type === "one-way" ? "One Way" : "Return"}
              </button>
            ))}
          </div>

          {/* Search form */}
          <form onSubmit={handleSearch} aria-label="Flight search">
            <div className="bg-white rounded-2xl p-7 shadow-[0_20px_60px_rgba(0,0,0,0.2)] grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-end sm:grid-cols-1 sm:gap-3">

              {/* Origin */}
              <div className="flex flex-col gap-1.5 relative">
                <label htmlFor="fl-origin" className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-400">From</label>
                <div className={inputCls}>
                  <span className="text-gray-400 shrink-0" aria-hidden="true">🛫</span>
                  <input id="fl-origin" type="text" placeholder="e.g. LOS" value={origin} onChange={e => setOrigin(e.target.value.toUpperCase())} maxLength={3} required aria-label="Origin airport code" className={fieldInputCls} />
                </div>
                <button
                  type="button"
                  onClick={handleSwap}
                  aria-label="Swap origin and destination"
                  className="absolute -right-[18px] top-1/2 translate-y-1 w-[34px] h-[34px] bg-[#FF7F7F] border-[3px] border-white rounded-full flex items-center justify-center text-white text-sm z-10 cursor-pointer hover:bg-[#df6e6e] hover:rotate-180 transition-all duration-300 shadow-[0_2px_8px_rgba(255,127,127,0.3)] sm:hidden"
                >⇄</button>
              </div>

              {/* Destination */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fl-dest" className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-400">To</label>
                <div className={inputCls}>
                  <span className="text-gray-400 shrink-0" aria-hidden="true">🛬</span>
                  <input id="fl-dest" type="text" placeholder="e.g. LHR" value={destination} onChange={e => setDestination(e.target.value.toUpperCase())} maxLength={3} required aria-label="Destination airport code" className={fieldInputCls} />
                </div>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fl-dep" className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-400">Departure</label>
                <div className={inputCls}>
                  <span className="text-gray-400 shrink-0" aria-hidden="true">📅</span>
                  <input id="fl-dep" type="date" value={depDate} min={today} onChange={e => setDepDate(e.target.value)} required className={fieldInputCls} />
                </div>
              </div>

              {/* Passengers */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fl-pax" className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-400">Passengers</label>
                <div className={inputCls}>
                  <span className="text-gray-400 shrink-0" aria-hidden="true">👤</span>
                  <select id="fl-pax" value={passengers} onChange={e => setPassengers(Number(e.target.value))} aria-label="Number of passengers" className={fieldInputCls}>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? "Adult" : "Adults"}</option>)}
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                aria-label="Search for flights"
                className="bg-[#FF7F7F] hover:bg-[#df6e6e] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl px-7 py-[13px] text-[15px] font-semibold flex items-center gap-2 whitespace-nowrap shadow-[0_4px_16px_rgba(255,127,127,0.35)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(255,127,127,0.4)] transition-all duration-200"
              >
                {loading ? (
                  <><div className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />Searching</>
                ) : "✈ Search"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-[900px] mx-auto px-12 py-10 sm:px-5">
        {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-4 text-sm mb-5" role="alert">{error}</div>}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4" role="status" aria-label="Searching for flights">
            <div className="w-11 h-11 border-[3px] border-gray-100 border-t-[#FF7F7F] rounded-full animate-spin" aria-hidden="true" />
            <p className="text-sm text-gray-400">Finding the best flights for you…</p>
          </div>
        )}

        {!loading && searched && (
          <>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <div className="text-xl font-bold text-gray-900">{origin} → {destination}</div>
                <div className="text-[13px] text-gray-400">{sortedFlights.length} flight{sortedFlights.length !== 1 ? "s" : ""} found</div>
              </div>
              {sortedFlights.length > 0 && (
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} aria-label="Sort flights by" className="text-[13px] px-3 py-1.5 border border-gray-100 rounded-lg text-gray-600 bg-white cursor-pointer outline-none">
                  <option value="price">Sort: Cheapest first</option>
                  <option value="duration">Sort: Shortest first</option>
                </select>
              )}
            </div>

            {sortedFlights.length === 0 && !error && (
              <div className="text-center py-20 text-gray-400" aria-live="polite">
                <span className="text-[52px] mb-4 block" aria-hidden="true">✈️</span>
                <p className="text-lg font-semibold text-gray-900 mb-2">No flights found</p>
                <p>Try different airports or dates</p>
              </div>
            )}

            <div role="list" aria-label="Flight results">
              {sortedFlights.map((flight, i) => <FlightCard key={i} flight={flight} onBook={handleBook} />)}
            </div>
          </>
        )}

        {!loading && !searched && (
          <div className="text-center py-20 text-gray-400" aria-live="polite">
            <span className="text-[52px] mb-4 block" aria-hidden="true">🌍</span>
            <p className="text-base font-medium text-gray-600">Enter your route above to search for flights</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Flights