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

  const departureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0]

    /* ACCESSIBILITY: page title includes destination name so
   screen readers announce exactly where the user landed */
useEffect(() => {
  document.title = destination?.name
    ? `${destination.name} — RouteWise`
    : "Destination — RouteWise"
}, [destination])

  useEffect(() => {
    if (!cityCode) return
    fetchFlights()
    fetchHotels()
  }, [cityCode])

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
      <div
        role="alert"
        aria-live="assertive"
        className="min-h-screen flex flex-col items-center justify-center"
      >
        <p className="text-gray-500 text-lg mb-4">Destination not found</p>
        <button
          onClick={() => navigate("/")}
          aria-label="Return to RouteWise home page"
          className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600"
        >
          Go Home
        </button>
      </div>
    )
  }

  return (
    <>
     
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div
          role="banner"
          aria-labelledby="destination-heading"
          className="relative bg-[#0099BB] py-16 px-8 text-white text-center"
        >
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back to previous page"
            className="absolute left-8 top-8 text-white hover:text-gray-200 flex items-center gap-1"
          >
            <span aria-hidden="true">←</span> Back
          </button>

          <h1 id="destination-heading" className="text-4xl font-bold mb-2">
            {destination.name}
          </h1>
          <p className="text-teal-50">
            {destination.address?.cityName}, {destination.address?.countryName}
          </p>

          <button
            onClick={handleSave}
            disabled={!!isAlreadySaved}
            aria-pressed={!!isAlreadySaved}
            aria-label={
              isAlreadySaved
                ? `${destination.name} already saved to itinerary`
                : `Save ${destination.name} to your itinerary`
            }
            className={`mt-4 px-6 py-2 rounded-full font-medium transition-colors ${
              isAlreadySaved
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-white text-[#0099BB]  hover:bg-gray-100"
            }`}
          >
            <span aria-hidden="true">{isAlreadySaved ? "✅" : "➕"}</span>{" "}
            {isAlreadySaved ? "Saved to Itinerary" : "Save to Itinerary"}
          </button>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Destination information tabs"
          className="flex justify-center gap-4 py-6 bg-white shadow-sm"
        >
          <button
            role="tab"
            aria-selected={activeTab === "flights"}
            aria-controls="flights-panel"
            id="flights-tab"
            onClick={() => setActiveTab("flights")}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === "flights"
                ? "bg-pink-500 text-white"
                : "text-gray-600 hover:text-pink-500"
            }`}
          >
            <span aria-hidden="true">✈️</span> Flights
          </button>

          <button
            role="tab"
            aria-selected={activeTab === "hotels"}
            aria-controls="hotels-panel"
            id="hotels-tab"
            onClick={() => setActiveTab("hotels")}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === "hotels"
                ? "bg-pink-500 text-white"
                : "text-gray-600 hover:text-pink-500"
            }`}
          >
            <span aria-hidden="true">🏨</span> Hotels
          </button>
        </div>

        <div className="px-8 md:px-16 py-10">
          {/* Flights Panel */}
          <div
            role="tabpanel"
            id="flights-panel"
            aria-labelledby="flights-tab"
            hidden={activeTab !== "flights"}
          >
            <h2 className="text-2xl font-bold mb-6">Available Flights</h2>

            {loadingFlights && (
              <div role="status" aria-label="Loading flights" className="flex justify-center py-20">
                <div aria-hidden="true" className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!loadingFlights && flights.length === 0 && (
              <div className="text-center py-20">
                <p aria-hidden="true" className="text-5xl mb-4">✈️</p>
                <p className="text-gray-500">No flights found for this destination</p>
              </div>
            )}

            <div role="list" className="flex flex-col gap-4">
              {flights.map((flight, index) => (
                <div
                  key={index}
                  role="listitem"
                  aria-label={`Flight from ${flight.itineraries[0]?.segments[0]?.departure?.iataCode} to ${flight.itineraries[0]?.segments[0]?.arrival?.iataCode}, price ${flight.price?.total} ${flight.price?.currency}`}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div>
                    <p className="font-bold text-lg">
                      {flight.itineraries[0]?.segments[0]?.departure?.iataCode}{" "}
                      <span aria-hidden="true">→</span>{" "}
                      <span className="sr-only">to</span>
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
                    <button
                      aria-label={`Book flight from ${flight.itineraries[0]?.segments[0]?.departure?.iataCode} to ${flight.itineraries[0]?.segments[0]?.arrival?.iataCode} for ${flight.price?.total} ${flight.price?.currency}`}
                      className="mt-2 bg-pink-500 text-white px-5 py-2 rounded-full text-sm hover:bg-pink-600"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hotels Panel */}
          <div
            role="tabpanel"
            id="hotels-panel"
            aria-labelledby="hotels-tab"
            hidden={activeTab !== "hotels"}
          >
            <h2 className="text-2xl font-bold mb-6">Available Hotels</h2>

            {loadingHotels && (
              <div role="status" aria-label="Loading hotels" className="flex justify-center py-20">
                <div aria-hidden="true" className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!loadingHotels && hotels.length === 0 && (
              <div className="text-center py-20">
                <p aria-hidden="true" className="text-5xl mb-4">🏨</p>
                <p className="text-gray-500">No hotels found for this destination</p>
              </div>
            )}

            <div role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel, index) => (
                <div key={index} role="listitem">
                  <article
                    aria-label={`${hotel.name} hotel in ${hotel.address?.cityName || cityCode}`}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
                  >
                    <div
                      aria-hidden="true"
                      className="w-full h-32 bg-[#0099BB]  rounded-lg flex items-center justify-center mb-4"
                    />
                    <h3 className="text-lg font-bold mb-2">{hotel.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">
                      {hotel.address?.cityName}, {hotel.address?.countryName}
                    </p>
                    {hotel.price?.total && (
                      <p className="text-pink-500 font-semibold">
                        {hotel.price.total} {hotel.price.currency}
                      </p>
                    )}
                    <button
                      aria-label={`Book ${hotel.name} in ${hotel.address?.cityName || cityCode}`}
                      className="mt-4 bg-pink-500 text-white px-5 py-2 rounded-full text-sm hover:bg-pink-600"
                    >
                      Book Now
                    </button>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DestinationDetails