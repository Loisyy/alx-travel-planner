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

  /* ACCESSIBILITY: dynamic title updates based on search query
   so screen readers announce what was searched for */
  useEffect(() => {
    document.title = query
      ? `Results for "${query}" — RouteWise`
      : "Search Destinations — RouteWise"
  }, [query])

  useEffect(() => {
    if (query) {
      fetchDestinations()
    }
  }, [query])

  return (
    <>
      <div className="min-h-screen bg-gray-50">

        {/*
          ACCESSIBILITY: section with aria-label marks the search
          header as a distinct landmark region on the page.
        */}
        <section aria-label="Search destinations" className="bg-[#0099BB] py-10 px-8">
          <h1 className="text-white text-3xl font-bold text-center mb-6">
            Find Your Next Destination
          </h1>
          <SearchBar />
        </section>

        <div className="px-8 md:px-16 py-10">

          {/*
            ACCESSIBILITY: aria-live="polite" region announces status
            changes to screen readers without interrupting them.
            polite means it waits for the screen reader to finish
            reading before announcing the update.
            aria-atomic="true" means the whole message is read
            at once not just the changed part.
            This div is visually hidden with sr-only — it exists
            purely to communicate status to screen readers.
          */}
          <div
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {loading && "Searching for destinations, please wait..."}
            {error && `Error: ${error}`}
            {!loading && !error && destinations.length > 0 &&
              `Found ${destinations.length} destinations for ${query}`}
            {!loading && !error && destinations.length === 0 && query &&
              `No destinations found for ${query}`}
          </div>

          {query && (
            <p className="text-gray-600 mb-6">
              Showing results for:{" "}
              <span className="font-semibold text-pink-500">{query}</span>
            </p>
          )}

          {/*
            ACCESSIBILITY: role="status" on the loading spinner marks
            it as a live region. aria-label describes what is happening
            so screen readers announce "Loading destinations" when the
            spinner appears. Without this the spinner is just a
            spinning div that screen readers completely ignore.
          */}
          {loading && (
            <div
              role="status"
              aria-label="Loading destinations"
              className="flex justify-center items-center py-20"
            >
              {/* ACCESSIBILITY: aria-hidden on the visual spinner
                  because role="status" and aria-label on the parent
                  already communicate the loading state. Reading out
                  a spinning div element would be meaningless. */}
              <div
                aria-hidden="true"
                className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"
              ></div>
            </div>
          )}

          {/*
            ACCESSIBILITY: role="alert" on error messages makes them
            announce immediately and urgently to screen readers, unlike
            aria-live="polite" which waits. Errors need immediate
            attention so alert is the right role here.
          */}
          {error && (
            <div
              role="alert"
              className="bg-red-100 text-red-600 px-6 py-4 rounded-lg text-center"
            >
              {error}
            </div>
          )}

          {!loading && !error && destinations.length === 0 && query && (
            /*
              ACCESSIBILITY: aria-live="polite" on the empty state so
              screen readers announce when no results are found after
              the loading state resolves.
            */
            <div
              aria-live="polite"
              className="text-center py-20"
            >
              {/* ACCESSIBILITY: aria-hidden on decorative emoji */}
              <p aria-hidden="true" className="text-5xl mb-4">🌍</p>
              <p className="text-gray-500 text-lg">
                No destinations found for "{query}"
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try searching for another city or country
              </p>
            </div>
          )}

          {!loading && destinations.length > 0 && (
            /*
              ACCESSIBILITY: section with aria-label wraps the results
              grid. role="list" restores list semantics so screen
              readers announce how many results were found.
            */
            <section aria-label={`Search results for ${query}`}>
              <div
                role="list"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {destinations.map((dest) => (
                  <div role="listitem" key={dest.id}>
                    <DestinationCard
                      destination={dest}
                      navigate={navigate}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </>
  )
}

function DestinationCard({ destination, navigate }) {
  const { name, address, geoCode } = destination

  const handleExplore = () => {
    navigate(`/destination/${address?.cityCode}`, {
      state: { destination }
    })
  }

  /*
    ACCESSIBILITY: keyboard handler allows Enter and Space keys
    to trigger the explore action. By default only buttons and
    links respond to keyboard activation. Since we have a button
    inside this card it is already keyboard accessible but this
    ensures the whole card interaction is keyboard friendly.
  */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleExplore()
    }
  }

  return (
    /*
      ACCESSIBILITY: article marks each card as a self-contained
      piece of content that makes sense on its own.
      aria-label gives the card a meaningful name combining
      city and country so screen readers identify each card
      uniquely rather than announcing them all the same way.
    */
    <article
      aria-label={`${name}, ${address?.countryName}`}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
    >

      {/*
        ACCESSIBILITY: aria-hidden on the letter avatar because it is
        a decorative placeholder — the heading below already
        communicates the destination name.
      */}
      <div
        aria-hidden="true"
        className="w-full h-48 bg-[#0099BB]  flex items-center justify-center"
      >
        <span className="text-white text-6xl font-bold">
          {name?.charAt(0)}
        </span>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          {/*
            ACCESSIBILITY: h3 for the card heading maintains correct
            heading hierarchy — h1 is the page title, h2 is section
            titles, h3 is card titles. Screen readers use this
            hierarchy to build a page outline.
          */}
          <h3 className="text-xl font-bold">{name}</h3>
          <span className="text-gray-500 text-sm">{address?.countryName}</span>
        </div>

        <div className="flex items-center gap-1 text-gray-600 text-sm mb-4">
          {/* ACCESSIBILITY: aria-hidden on pin emoji — decorative */}
          <span aria-hidden="true">📍</span>
          <p>{address?.cityName}, {address?.countryCode}</p>
        </div>

        {geoCode && (
          <p className="text-gray-400 text-xs mb-4">
            Lat: {geoCode.latitude}, Long: {geoCode.longitude}
          </p>
        )}

        {/*
          ACCESSIBILITY: aria-label on the Explore button includes
          the destination name so screen reader users know exactly
          which destination they will explore. Without this, every
          Explore button on the page sounds identical and users
          cannot tell them apart.
        */}
        <button
          onClick={handleExplore}
          onKeyDown={handleKeyDown}
          aria-label={`Explore ${name}, ${address?.countryName}`}
          className="w-full bg-pink-500 text-white py-2 rounded-full text-sm hover:bg-pink-600"
        >
          Explore
        </button>
      </div>

    </article>
  )
}

export default Destinations