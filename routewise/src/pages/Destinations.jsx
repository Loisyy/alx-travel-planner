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

  useEffect(() => {
    if (query) {
      fetchDestinations()
    }
  }, [query])

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-teal-500 py-10 px-8">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Find Your Next Destination
        </h1>
        <SearchBar />
      </div>
      <div className="px-8 md:px-16 py-10">
        {query && (
          <p className="text-gray-600 mb-6">
            Showing results for:{" "}
            <span className="font-semibold text-pink-500">{query}</span>
          </p>
        )}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-600 px-6 py-4 rounded-lg text-center">
            {error}
          </div>
        )}
        {!loading && !error && destinations.length === 0 && query && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🌍</p>
            <p className="text-gray-500 text-lg">No destinations found for "{query}"</p>
            <p className="text-gray-400 text-sm mt-2">Try searching for another city or country</p>
          </div>
        )}
        {!loading && destinations.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} navigate={navigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function DestinationCard({ destination, navigate }) {
  const { name, address, geoCode } = destination

  const handleExplore = () => {
    navigate(`/destination/${address?.cityCode}`, {
      state: { destination }
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <div className="w-full h-48 bg-teal-400 flex items-center justify-center">
        <span className="text-white text-6xl font-bold">{name?.charAt(0)}</span>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">{name}</h3>
          <span className="text-gray-500 text-sm">{address?.countryName}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
          <span>📍</span>
          <p>{address?.cityName}, {address?.countryCode}</p>
        </div>
        {geoCode && (
          <p className="text-gray-400 text-xs mb-4">
            Lat: {geoCode.latitude}, Long: {geoCode.longitude}
          </p>
        )}
        <button
          onClick={handleExplore}
          className="w-full bg-pink-500 text-white py-2 rounded-full text-sm hover:bg-pink-600"
        >
          Explore
        </button>
      </div>
    </div>
  )
}

export default Destinations