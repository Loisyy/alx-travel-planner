import romeImg from "../assets/images/rome.png"
import parisImg from "../assets/images/paris.png"
import englandImg from "../assets/images/england.png"

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

/*
  ACCESSIBILITY: StarRating communicates the rating both visually
  and to screen readers. aria-label on the container announces the
  full rating like "Rating: 4 out of 5 stars" so screen reader users
  get the same information as sighted users without hearing each
  individual star character read out.
*/
function StarRating({ rating }) {
  return (
    <div
      role="img"
      aria-label={`Rating: ${rating} out of 5 stars`}
      className="flex gap-1"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        /*
          ACCESSIBILITY: aria-hidden on each individual star because
          the parent div's aria-label already communicates the full
          rating. Without this, screen readers would read each star
          character individually which is confusing and redundant.
        */
        <span
          key={star}
          aria-hidden="true"
          className={star <= rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function TopVisited() {
  return (
    /*
      ACCESSIBILITY: section with aria-labelledby points to the h2
      below. Screen readers announce this section using that heading
      text so users navigating by landmarks hear "Top Visited section".
    */
    <section
      aria-labelledby="top-visited-heading"
      className="px-8 md:px-16 py-12"
    >

      <div className="flex items-center justify-between mb-2">
        {/* ACCESSIBILITY: id matches aria-labelledby on section above */}
        <h2
          id="top-visited-heading"
          className="text-3xl font-bold"
        >
          Top Visited
        </h2>

        {/* ACCESSIBILITY: group role and aria-label on the button
            container tells screen readers these are carousel controls.
            Each button has a descriptive aria-label instead of just
            the arrow character which would be read as "single right
            angle quotation mark" — not helpful at all. */}
        <div role="group" aria-label="Destination carousel controls" className="flex gap-2">
          <button
            aria-label="Show next destinations"
            className="border rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100"
          >
            <span aria-hidden="true">›</span>
          </button>
          <button
            aria-label="Show previous destinations"
            className="border rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100"
          >
            <span aria-hidden="true">‹</span>
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-8">
        Explore the most visited and toured countries around the world
      </p>

      {/*
        ACCESSIBILITY: role="list" restores list semantics on a div.
        aria-label tells screen readers what kind of list this is.
        Screen readers announce "list of 3 items" so users know
        how many destinations are shown.
      */}
      <div
        role="list"
        aria-label="Top visited destinations"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {destinations.map((dest) => (
          /*
            ACCESSIBILITY: role="listitem" matches role="list" parent.
            role="article" marks each card as a self-contained piece
            of content. aria-label gives the card a meaningful name
            that combines city and country for full context.
          */
          <div
            key={dest.id}
            role="listitem"
          >
            <article
              aria-label={`${dest.city}, ${dest.country}`}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              {/*
                ACCESSIBILITY: Descriptive alt text explains what is
                in the image. "Scenic view of Rome, Italy" is far more
                useful than just "Rome" for someone using a screen reader.
              */}
              <img
                src={dest.image}
                alt={`Scenic view of ${dest.city}, ${dest.country}`}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xl font-bold">{dest.city}</h3>
                  <span className="text-gray-500 text-sm">{dest.country}</span>
                </div>

                <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                  {/* ACCESSIBILITY: aria-hidden on pin emoji — it is
                      decorative and the text beside it provides the
                      actual information */}
                  <span aria-hidden="true">📍</span>
                  <p>{dest.description}</p>
                </div>

                <StarRating rating={dest.rating} />

                <div className="flex items-center justify-between mt-3">
                  <span className="text-gray-600 text-sm">{dest.distance}</span>

                  {/*
                    ACCESSIBILITY: aria-label on the Explore button
                    includes the city name so screen reader users know
                    which destination they are exploring. Without this,
                    all three buttons just say "Explore" which gives no
                    context about which one does what.
                  */}
                  <button
                    aria-label={`Explore ${dest.city}, ${dest.country}`}
                    className="bg-pink-500 text-white px-5 py-1.5 rounded-full text-sm hover:bg-pink-600"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

    </section>
  )
}

export default TopVisited