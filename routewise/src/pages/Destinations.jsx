import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { searchDestinations } from "../services/amadeus"
import SearchBar from "../components/SearchBar"

function Destinations() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("search")
  const navigate = useNavigate()

  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDestinations = async () => {
    setLoading(true)
    setError(null)
    try {
      const results = await searchDestinations(query)
      setDestinations(results || [])
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.title = query
      ? `Results for "${query}" — RouteWise`
      : "Search Destinations — RouteWise"
  }, [query])

  useEffect(() => {
    if (query) fetchDestinations()
  }, [query])

  return (
    <div className="min-h-screen bg-gray-50">

      <section aria-label="Search destinations" className="bg-[#019FCD] py-10 px-8">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Find Your Next Destination
        </h1>
        <div className="flex justify-center">
          <SearchBar />
        </div>
      </section>

      <div className="px-8 md:px-16 py-10">

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {loading && "Searching for destinations, please wait..."}
          {error && `Error: ${error}`}
          {!loading && !error && destinations.length > 0 && `Found ${destinations.length} destinations for ${query}`}
          {!loading && !error && destinations.length === 0 && query && `No destinations found for ${query}`}
        </div>

        {query && (
          <p className="text-gray-600 mb-6">
            Showing results for: <span className="font-semibold text-[#FF7F7F]">{query}</span>
          </p>
        )}

        {loading && (
          <div role="status" aria-label="Loading destinations" className="flex justify-center items-center py-20">
            <div aria-hidden="true" className="w-10 h-10 border-4 border-[#FF7F7F] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div role="alert" className="bg-red-100 text-red-600 px-6 py-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {!loading && !error && destinations.length === 0 && query && (
          <div aria-live="polite" className="text-center py-20">
            <p aria-hidden="true" className="text-5xl mb-4">🌍</p>
            <p className="text-gray-500 text-lg">No destinations found for "{query}"</p>
            <p className="text-gray-400 text-sm mt-2">Try searching for another city or country</p>
          </div>
        )}

        {!loading && destinations.length > 0 && (
          <section aria-label={`Search results for ${query}`}>
            <div role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((dest, index) => (
                // Use index as fallback to guarantee unique keys
                <div role="listitem" key={`${dest.id}-${index}`}>
                  <DestinationCard destination={dest} navigate={navigate} />
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}

function DestinationCard({ destination, navigate }) {
  const { name, iataCode, geoCode, address } = destination

  const cityName = address?.cityName || ""
  const countryName = address?.countryName || ""
  const countryCode = address?.countryCode || ""
  const cityCode = iataCode || address?.cityCode || countryCode

  const handleExplore = () => {
    navigate(`/destination/${cityCode}`, { state: { destination } })
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleExplore()
    }
  }

  return (
    <article
      aria-label={`${name}, ${countryName}`}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
    >
      <div aria-hidden="true" className="w-full h-48 bg-[#019FCD] flex items-center justify-center">
        <span className="text-white text-6xl font-bold">{name?.charAt(0)}</span>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">{name}</h3>
          <span className="text-gray-500 text-sm">{countryName}</span>
        </div>

        <div className="flex items-center gap-1 text-gray-600 text-sm mb-4">
          <span aria-hidden="true">📍</span>
          <p>{cityName}{cityName && countryCode ? ", " : ""}{countryCode}</p>
        </div>

        {geoCode && (
          <p className="text-gray-400 text-xs mb-4">
            Lat: {geoCode.latitude?.toFixed(4)}, Long: {geoCode.longitude?.toFixed(4)}
          </p>
        )}

        <button
          onClick={handleExplore}
          onKeyDown={handleKeyDown}
          aria-label={`Explore ${name}, ${countryName}`}
          className="w-full bg-[#FF7F7F] text-white py-2 rounded-full text-sm hover:bg-[#df6e6e] transition-colors duration-200"
        >
          Explore
        </button>
      </div>
    </article>
  )
}

export default Destinations