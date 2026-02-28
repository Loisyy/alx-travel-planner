import { useEffect } from "react"
import { useItinerary } from "../context/ItineraryContext"
import { useNavigate } from "react-router-dom"

function Itinerary() {
  const { itinerary, removeFromItinerary, clearItinerary } = useItinerary()
  const navigate = useNavigate()

  /* ACCESSIBILITY: title includes saved count so screen readers
   announce how many destinations are saved without navigating */
useEffect(() => {
  document.title = itinerary.length > 0
    ? `My Itinerary (${itinerary.length}) — RouteWise`
    : "My Itinerary — RouteWise"
}, [itinerary])

  return (
    <>
      <div className="min-h-screen bg-gray-50">

        {/*
          ACCESSIBILITY: section with aria-labelledby points to the
          h1 below. This creates a labeled landmark region that
          screen readers can identify and navigate to directly.
        */}
        <section
          aria-labelledby="itinerary-heading"
          className="bg-[#0099BB] py-16 px-8 text-white text-center"
        >
          {/* ACCESSIBILITY: id matches aria-labelledby above */}
          <h1 id="itinerary-heading" className="text-4xl font-bold mb-2">
            My Itinerary
          </h1>
          <p className="text-teal-50">Your saved travel destinations</p>
        </section>

        <div className="px-8 md:px-16 py-10">

          {itinerary.length === 0 && (
            /*
              ACCESSIBILITY: aria-live="polite" announces the empty
              state when the itinerary is cleared. role="status"
              marks it as a status message that does not interrupt
              the screen reader but is announced when convenient.
            */
            <div
              role="status"
              aria-live="polite"
              className="text-center py-20"
            >
              {/* ACCESSIBILITY: aria-hidden on decorative emoji */}
              <p aria-hidden="true" className="text-6xl mb-4">🗺️</p>
              <p className="text-gray-500 text-lg mb-2">
                Your itinerary is empty
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Search for destinations and save them here
              </p>
              <button
                onClick={() => navigate("/")}
                aria-label="Go to home page to explore destinations"
                className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600"
              >
                Explore Destinations
              </button>
            </div>
          )}

          {itinerary.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                {/*
                  ACCESSIBILITY: aria-live="polite" on the count
                  paragraph so screen readers announce the updated
                  count when a destination is added or removed.
                  aria-atomic="true" reads the full sentence not
                  just the changed number.
                */}
                <p
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-gray-600"
                >
                  You have{" "}
                  <span className="font-bold text-pink-500">
                    {itinerary.length}
                  </span>{" "}
                  destination{itinerary.length > 1 ? "s" : ""} saved
                </p>

                {/*
                  ACCESSIBILITY: aria-label describes the destructive
                  action clearly. "Clear all saved destinations" is
                  more informative than just "Clear All" — the user
                  knows exactly what will be removed before clicking.
                */}
                <button
                  onClick={clearItinerary}
                  aria-label="Clear all saved destinations from your itinerary"
                  className="text-red-500 text-sm hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/*
                ACCESSIBILITY: role="list" with aria-label describes
                the list contents. Screen readers announce
                "Saved destinations list, 3 items" so users know
                what they are navigating through and how many items
                to expect.
              */}
              <div
                role="list"
                aria-label="Saved destinations"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {itinerary.map((item) => (
                  <div key={item.id} role="listitem">
                    {/*
                      ACCESSIBILITY: article marks each saved destination
                      as self-contained content. aria-label gives each
                      card a unique name combining city and country so
                      screen readers can distinguish between cards.
                    */}
                    <article
                      aria-label={`${item.name}, ${item.country}`}
                      className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
                    >
                      {/*
                        ACCESSIBILITY: aria-hidden on the decorative
                        letter avatar — the heading below already
                        communicates the destination name.
                      */}
                      <div
                        aria-hidden="true"
                        className="w-full h-32 bg-[#0099BB] rounded-lg flex items-center justify-center mb-4"
                      >
                        <span className="text-white text-5xl font-bold">
                          {item.name?.charAt(0)}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold mb-1">{item.name}</h2>

                      <p className="text-gray-500 text-sm mb-1">
                        {/* ACCESSIBILITY: aria-hidden on pin emoji */}
                        <span aria-hidden="true">📍</span>{" "}
                        {item.city}, {item.country}
                      </p>

                      <p className="text-gray-400 text-xs mb-4">
                        City Code: {item.cityCode}
                      </p>

                      <div className="flex gap-2">
                        {/*
                          ACCESSIBILITY: aria-label on View Details
                          includes destination name so screen reader
                          users know which destination they will view.
                          All buttons on the page are uniquely labeled.
                        */}
                        <button
                          onClick={() =>
                            navigate(`/destination/${item.cityCode}`, {
                              state: {
                                destination: {
                                  id: item.id,
                                  name: item.name,
                                  address: {
                                    cityName: item.city,
                                    countryName: item.country,
                                    cityCode: item.cityCode,
                                  },
                                },
                              },
                            })
                          }
                          aria-label={`View details for ${item.name}, ${item.country}`}
                          className="flex-1 bg-pink-500 text-white py-2 rounded-full text-sm hover:bg-pink-600"
                        >
                          View Details
                        </button>

                        {/*
                          ACCESSIBILITY: aria-label on Remove button
                          includes the destination name so users know
                          exactly what they are removing. Without this,
                          all Remove buttons sound identical.
                        */}
                        <button
                          onClick={() => removeFromItinerary(item.id)}
                          aria-label={`Remove ${item.name} from your itinerary`}
                          className="flex-1 border border-red-400 text-red-400 py-2 rounded-full text-sm hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Itinerary