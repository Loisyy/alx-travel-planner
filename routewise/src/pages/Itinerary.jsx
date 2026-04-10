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
        <section
          aria-labelledby="itinerary-heading"
          className="bg-[#019FCD] py-16 px-8 text-white text-center"
        >
          <h1 id="itinerary-heading" className="text-4xl font-bold mb-2">
            My Itinerary
          </h1>
          <p className="text-teal-50">Your saved travel destinations</p>
        </section>

        <div className="px-8 md:px-16 py-10">

          {itinerary.length === 0 && (
          
            <div
              role="status"
              aria-live="polite"
              className="text-center py-20"
            >
            
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
                className="bg-[#FF7F7F] text-white px-6 py-2 rounded-full hover:bg-[#DF6E6E]"
              >
                Explore Destinations
              </button>
            </div>
          )}

          {itinerary.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-6">
          
                <p
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-gray-600"
                >
                  You have{" "}
                  <span className="font-bold text-[#FF7F7F]">
                    {itinerary.length}
                  </span>{" "}
                  destination{itinerary.length > 1 ? "s" : ""} saved
                </p>

                <button
                  onClick={clearItinerary}
                  aria-label="Clear all saved destinations from your itinerary"
                  className="text-red-500 text-sm hover:underline"
                >
                  Clear All
                </button>
              </div>

            
              <div
                role="list"
                aria-label="Saved destinations"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {itinerary.map((item) => (
                  <div key={item.id} role="listitem">
                  \
                    <article
                      aria-label={`${item.name}, ${item.country}`}
                      className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
                    >
                \
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
                       
                        <span aria-hidden="true">📍</span>{" "}
                        {item.city}, {item.country}
                      </p>

                      <p className="text-gray-400 text-xs mb-4">
                        City Code: {item.cityCode}
                      </p>

                      <div className="flex gap-2">
                       
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
                          className="flex-1 bg-[#FF7F7F] text-white py-2 rounded-full text-sm hover:bg-[#0099BB]"
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