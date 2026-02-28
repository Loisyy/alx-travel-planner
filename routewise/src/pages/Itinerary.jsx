import { useItinerary } from "../context/ItineraryContext"
import { useNavigate } from "react-router-dom"


function Itinerary() {
  const { itinerary, removeFromItinerary, clearItinerary } = useItinerary()
  const navigate = useNavigate()


  return (
    <div className="min-h-screen bg-gray-50">


      {/* Header */}
      <div className="bg-[#0099BB] py-16 px-8 text-white text-center">
        <h1 className="text-4xl font-bold mb-2">My Itinerary</h1>
        <p className="text-teal-50">Your saved travel destinations</p>
      </div>


      <div className="px-8 md:px-16 py-10">


        {/* Empty State */}
        {itinerary.length === 0 && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🗺️</p>
            <p className="text-gray-500 text-lg mb-2">Your itinerary is empty</p>
            <p className="text-gray-400 text-sm mb-6">
              Search for destinations and save them here
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600"
            >
              Explore Destinations
            </button>
          </div>
        )}


        {/* Itinerary List */}
        {itinerary.length > 0 && (
          <div>


            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                You have{" "}
                <span className="font-bold text-pink-500">{itinerary.length}</span>{" "}
                destination{itinerary.length > 1 ? "s" : ""} saved
              </p>
              <button
                onClick={clearItinerary}
                className="text-red-500 text-sm hover:underline"
              >
                Clear All
              </button>
            </div>


            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {itinerary.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
                >
                  {/* Icon */}
                  <div className="w-full h-32 bg-[#0099BB] rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white text-5xl font-bold">
                      {item.name?.charAt(0)}
                    </span>
                  </div>


                  {/* Info */}
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm mb-1">
                    📍 {item.city}, {item.country}
                  </p>
                  <p className="text-gray-400 text-xs mb-4">
                    City Code: {item.cityCode}
                  </p>


                  {/* Buttons */}
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
                      className="flex-1 bg-pink-500 text-white py-2 rounded-full text-sm hover:bg-pink-600"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => removeFromItinerary(item.id)}
                      className="flex-1 border border-red-400 text-red-400 py-2 rounded-full text-sm hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


export default Itinerary