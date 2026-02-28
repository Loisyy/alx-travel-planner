import { useState, useEffect } from "react"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import { searchFlights, searchHotels } from "../services/amadeus"
import { useItinerary } from "../context/ItineraryContext"

function DestinationDetails() {
  const { cityCode } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const destination = state?.destination

  const [flights, setFlights] = useState([])
  const [hotels, setHotels] = useState([])
  const [loadingFlights, setLoadingFlights] = useState(false)
  const [loadingHotels, setLoadingHotels] = useState(false)
  const [activeTab, setActiveTab] = useState("flights")

  const { addToItinerary, itinerary } = useItinerary()
  const isAlreadySaved = itinerary.find((i) => i.id === destination?.id)

  const handleSave = () => {
    addToItinerary({
      id: destination?.id || cityCode,
      name: destination?.name,
      country: destination?.address?.countryName,
      city: destination?.address?.cityName,
      cityCode: cityCode,
    })
  }

  const today = new Date()
  const departureDate = new Date(today.setDate(today.getDate() + 7))
    .toISOString()
    .split("T")[0]

  useEffect(() => {
    fetchFlights()
    fetchHotels()
  }, [])

  const fetchFlights = async () => {
    setLoadingFlights(true)
    try {
      const results = await searchFlights("LON", cityCode, departureDate)
      setFlights(results || [])
    } catch (err) {
      console.error("Flights error:", err)
    } finally {
      setLoadingFlights(false)
    }
  }

  const fetchHotels = async () => {
    setLoadingHotels(true)
    try {
      const results = await searchHotels(cityCode)
      setHotels(results?.slice(0, 6) || [])
    } catch (err) {
      console.error("Hotels error:", err)
    } finally {
      setLoadingHotels(false)
    }
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg mb-4">Destination not found</p>
        <button
          onClick={() => navigate("/")}
          className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600"
        >
          Go Home
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-teal-500 py-16 px-8 text-white text-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-8 top-8 text-white hover:text-gray-200 flex items-center gap-1"
        >
          ← Back
        </button>
        <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
        <p className="text-teal-100">
          {destination.address?.cityName}, {destination.address?.countryName}
        </p>
        <button
          onClick={handleSave}
          disabled={isAlreadySaved}
          className={`mt-4 px-6 py-2 rounded-full font-medium transition-colors ${
            isAlreadySaved
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-white text-teal-600 hover:bg-gray-100"
          }`}
        >
          {isAlreadySaved ? "✅ Saved to Itinerary" : "➕ Save to Itinerary"}
        </button>
      </div>

      <div className="flex justify-center gap-4 py-6 bg-white shadow-sm">
        <button
          onClick={() => setActiveTab("flights")}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeTab === "flights" ? "bg-pink-500 text-white" : "text-gray-600 hover:text-pink-500"
          }`}
        >
          ✈️ Flights
        </button>
        <button
          onClick={() => setActiveTab("hotels")}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeTab === "hotels" ? "bg-pink-500 text-white" : "text-gray-600 hover:text-pink-500"
          }`}
        >
          🏨 Hotels
        </button>
      </div>

      <div className="px-8 md:px-16 py-10">
        {activeTab === "flights" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Available Flights</h2>
            {loadingFlights && (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {!loadingFlights && flights.length === 0 && (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">✈️</p>
                <p className="text-gray-500">No flights found for this destination</p>
              </div>
            )}
            <div className="flex flex-col gap-4">
              {flights.map((flight, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="font-bold text-lg">
                      {flight.itineraries[0]?.segments[0]?.departure?.iataCode} →{" "}
                      {flight.itineraries[0]?.segments[0]?.arrival?.iataCode}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Departure: {flight.itineraries[0]?.segments[0]?.departure?.at?.split("T")[0]}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Duration: {flight.itineraries[0]?.duration?.replace("PT", "").toLowerCase()}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Airline: {flight.validatingAirlineCodes?.[0]}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-pink-500">
                      {flight.price?.total} {flight.price?.currency}
                    </p>
                    <button className="mt-2 bg-pink-500 text-white px-5 py-2 rounded-full text-sm hover:bg-pink-600">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "hotels" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Available Hotels</h2>
            {loadingHotels && (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {!loadingHotels && hotels.length === 0 && (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🏨</p>
                <p className="text-gray-500">No hotels found for this destination</p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                  <div className="w-full h-32 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-4xl">🏨</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{hotel.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    📍 {hotel.address?.cityName || cityCode}
                  </p>
                  <button className="w-full bg-pink-500 text-white py-2 rounded-full text-sm hover:bg-pink-600">
                    View Hotel
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DestinationDetails