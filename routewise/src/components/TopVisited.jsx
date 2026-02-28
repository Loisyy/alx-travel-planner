import romeImg from "../assets/images/rome.jpg";
import parisImg from "../assets/images/paris.jpg";
import englandImg from "../assets/images/england.jpg";
import StarRating from "./StarRating";

const destinations = [
  {
    id: 1,
    city: "Rome",
    country: "Italy",
    description:
      "Explore ancient ruins like the Colosseum, wander through the Roman Forum, and visit the breathtaking Vatican City — a perfect blend of history, art, and culture.",
    rating: 5,
    distance: "2.5 km from city center",
    image: romeImg,
  },
  {
    id: 2,
    city: "Paris",
    country: "France",
    description:
      "Experience the romance of the Eiffel Tower, world-class art at the Louvre, charming cafés, and elegant streets filled with fashion and history.",
    rating: 4,
    distance: "6 km from city center",
    image: parisImg,
  },
  {
    id: 3,
    city: "London",
    country: "United Kingdom",
    description:
      "Discover iconic landmarks like Big Ben and Buckingham Palace, enjoy diverse cuisine, rich history, and vibrant cultural experiences.",
    rating: 4,
    distance: "5 km from city center",
    image: englandImg,
  },
];

function TopVisited() {
  return (
    <div className="px-8 md:px-16 py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-bold">Top Visited</h2>
        <div className="flex gap-2">
          <button className="border rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100">
            ›
          </button>
          <button className="border rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100">
            ‹
          </button>
        </div>
      </div>
      <p className="text-gray-500 mb-8">
        Explore the most visited and toured countries around the world
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            {/* Image */}
            <img
              src={dest.image}
              alt={dest.city}
              className="w-full h-52 object-cover"
            />

            {/* Card Body */}
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
  );
}

export default TopVisited;
