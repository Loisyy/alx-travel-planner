import romeImg from "../assets/images/rome.jpg"
import parisImg from "../assets/images/paris.jpg"
import englandImg from "../assets/images/england.jpg"

const destinations = [
  {
    id: 1,
    city: "Rome",
    country: "Italy",
    description: "Home to St. Peter's Basilica, the Vatican Museums.",
    rating: 5,
    distance: "0.17 to 0.19",
    image: romeImg,
  },
  {
    id: 2,
    city: "Paris",
    country: "France",
    description: "Known for romance, art, fashion and architecture.",
    rating: 4,
    distance: "7 miles (11)",
    image: parisImg,
  },
  {
    id: 3,
    city: "England",
    country: "UK",
    description: "Rich in history, royal traditions, literature, influence.",
    rating: 4,
    distance: "1.12 square",
    image: englandImg,
  },
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-1 items-center text-yellow-400 mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star >= rating ? "★" : "☆"}>
        </span>

      ))}
    </div>
  )
}

function TopVisited() {
  return (
    <div className="px-8 md:px-16 py-12">

      {/* Section Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-bold">Top Visited</h2>
        <div className="flex gap-2">
          <button className="border rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100">›</button>
          <button className="border rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100">‹</button>
        </div>
      </div>
      <p className="text-gray-500 mb-8">
        Explore the most visited and toured countries around the world
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <div key={dest.id} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
            <img
              src={dest.image}
              alt={dest.city}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-xl font-bold">{dest.city}</h3>
                <span className="text-gray-500 text-sm">{dest.country}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                <span>📍</span>
                <p>{dest.description}</p>
              </div>
              <StarRating rating={dest.rating} />
              <div className="flex items-center justify-between mt-3">
                <span className="text-gray-600 text-sm">{dest.distance}</span>
                <button className="bg-pink-500 text-white px-5 py-1.5 rounded-full text-sm hover:bg-pink-600">
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default TopVisited