import { useState, useEffect } from "react"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
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
      /*
        ACCESSIBILITY: role="alert" announces this error state
        immediately when it renders. aria-live="assertive" ensures
        screen readers interrupt whatever they are reading to
        announce that the destination was not found — this is
        important feedback that requires immediate attention.
      */
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
      {/*
        ACCESSIBILITY: Page title includes the destination name so
        screen readers announce exactly where the user is when
        the page loads. "Rome — RouteWise" is far more useful
        than a generic title.
      */}
      <Helmet>
        <title>{destination?.name} — RouteWise</title>
        <meta
          name="description"
          content={`Explore flights and hotels in ${destination?.name}, ${destination?.address?.countryName}`}
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">

        {/*
          ACCESSIBILITY: aria-live region for flight and hotel loading
          status. Screen readers announce when data finishes loading
          so users know when to interact with the content.
        */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {loadingFlights && "Loading available flights, please wait..."}
          {loadingHotels && "Loading available hotels, please wait..."}
          {!loadingFlights && flights.length > 0 &&
            `Found ${flights.length} available flights to ${destination?.name}`}
          {!loadingHotels && hotels.length > 0 &&
            `Found ${hotels.length} hotels in ${destination?.name}`}
        </div>

        {/*
          ACCESSIBILITY: role="banner" on the hero section marks it
          as the page banner. aria-labelledby points to the h1
          inside so screen readers describe this region using the
          destination name.
        */}
        <div
          role="banner"
          aria-labelledby="destination-heading"
          className="relative bg-teal-500 py-16 px-8 text-white text-center"
        >

          {/*
            ACCESSIBILITY: aria-label on the back button describes
            the action clearly. navigate(-1) goes back in history
            so "Go back to previous page" is accurate and helpful.
          */}
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back to previous page"
            className="absolute left-8 top-8 text-white hover:text-gray-200 flex items-center gap-1"
          >
            {/* ACCESSIBILITY: aria-hidden on arrow — the button
                label already describes the action */}
            <span aria-hidden="true">←</span> Back
          </button>

          {/*
            ACCESSIBILITY: id="destination-heading" matches the
            aria-labelledby on the banner above. This is the main
            h1 for the page — there should only ever be one h1.
          */}
          <h1
            id="destination-heading"
            className="text-4xl font-bold mb-2"
          >
            {destination.name}
          </h1>

          <p className="text-teal-100">
            {destination.address?.cityName}, {destination.address?.countryName}
          </p>

          {/*
            ACCESSIBILITY: aria-pressed communicates the toggle state
            of the save button. When saved, aria-pressed="true" tells
            screen readers the button is in a pressed/active state.
            disabled prevents interaction and screen readers announce
            the button as dimmed/unavailable when already saved.
            aria-label updates dynamically to reflect current state.
          */}
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
                : "bg-white text-teal-600 hover:bg-gray-100"
            }`}
          >
            {/* ACCESSIBILITY: aria-hidden on emoji — the button's
                aria-label communicates the full state already */}
            <span aria-hidden="true">
              {isAlreadySaved ? "✅" : "➕"}
            </span>{" "}
            {isAlreadySaved ? "Saved to Itinerary" : "Save to Itinerary"}
          </button>
        </div>

        {/*
          ACCESSIBILITY: role="tablist" marks this as a tab widget.
          aria-label describes what the tabs control.
          This is the correct ARIA pattern for tabbed interfaces —
          screen readers announce "Flights Hotels tablist" and
          users can navigate between tabs with arrow keys.
        */}
        <div
          role="tablist"
          aria-label="Destination information tabs"
          className="flex justify-center gap-4 py-6 bg-white shadow-sm"
        >
          {/*
            ACCESSIBILITY: role="tab" marks each button as a tab.
            aria-selected tells screen readers which tab is active.
            aria-controls links each tab to the panel it controls
            using the panel's id below.
          */}
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

          {/*
            ACCESSIBILITY: role="tabpanel" marks this as the panel
            controlled by the flights tab. aria-labelledby links it
            back to the tab button using the tab's id. hidden attribute
            hides inactive panels from both visual users and screen
            readers completely.
          */}
          <div
            role="tabpanel"
            id="flights-panel"
            aria-labelledby="flights-tab"
            hidden={activeTab !== "flights"}
          >
            <h2 className="text-2xl font-bold mb-6">Available Flights</h2>

            {loadingFlights && (
              <div
                role="status"
                aria-label="Loading flights"
                className="flex justify-center py-20"
              >
                <div
                  aria-hidden="true"
                  className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"
                ></div>
              </div>
            )}

            {!loadingFlights && flights.length === 0 && (
              <div className="text-center py-20">
                <p aria-hidden="true" className="text-5xl mb-4">✈️</p>
                <p className="text-gray-500">
                  No flights found for this destination
                </p>
              </div>
            )}

            {/*
              ACCESSIBILITY: role="list" on the flights container.
              Each flight card is a listitem. Screen readers announce
              how many flights are in the list.
            */}
            <div role="list" className="flex flex-col gap-4">
              {flights.map((flight, index) => (
                <div
                  key={index}
                  role="listitem"
                  /*
                    ACCESSIBILITY: aria-label gives each flight card
                    a meaningful summary — screen readers announce
                    the route and price when the user reaches the card.
                  */
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
                      Departure:{" "}
                      {flight.itineraries[0]?.segments[0]?.departure?.at?.split("T")[0]}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Duration:{" "}
                      {flight.itineraries[0]?.duration?.replace("PT", "").toLowerCase()}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Airline: {flight.validatingAirlineCodes?.[0]}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-pink-500">
                      {flight.price?.total} {flight.price?.currency}
                    </p>
                    {/*
                      ACCESSIBILITY: aria-label includes price and
                      route so screen reader users know exactly what
                      they are booking when multiple Book Now buttons
                      are on screen at the same time.
                    */}
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

          {/*
            ACCESSIBILITY: hotels tabpanel mirrors the flights panel
            pattern. hidden attribute removes it from the accessibility
            tree when the flights tab is active.
          */}
          <div
            role="tabpanel"
            id="hotels-panel"
            aria-labelledby="hotels-tab"
            hidden={activeTab !== "hotels"}
          >
            <h2 className="text-2xl font-bold mb-6">Available Hotels</h2>

            {loadingHotels && (
              <div
                role="status"
                aria-label="Loading hotels"
                className="flex justify-center py-20"
              >
                <div
                  aria-hidden="true"
                  className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"
                ></div>
              </div>
            )}

            {!loadingHotels && hotels.length === 0 && (
              <div className="text-center py-20">
                <p aria-hidden="true" className="text-5xl mb-4">🏨</p>
                <p className="text-gray-500">
                  No hotels found for this destination
                </p>
              </div>
            )}

            <div
              role="list"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {hotels.map((hotel, index) => (
                <div
                  key={index}
                  role="listitem"
                >
                  {/*
                    ACCESSIBILITY: article marks each hotel card as
                    self-contained content. aria-label gives each
                    card a unique meaningful name for screen readers.
                  */}
                  <article
                    aria-label={`${hotel.name} hotel in ${hotel.address?.cityName || cityCode}`}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
                  >
                    {/* ACCESSIBILITY: aria-hidden on decorative emoji */}
                    <div
                      aria-hidden="true"
                      className="w-full h-32 bg-teal-100 rounded-lg flex items-center justify-center mb-4"
                    >