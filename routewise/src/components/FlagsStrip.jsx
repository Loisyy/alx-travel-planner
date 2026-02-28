import norwayImg from "../assets/images/norway.png"
import portugalImg from "../assets/images/portugal.png"
import turkeyImg from "../assets/images/turkey.png"
import usaImg from "../assets/images/usa.png"
import venezuelaImg from "../assets/images/venezuela.png"
import irelandImg from "../assets/images/ireland.png"

const flags = [
  { country: "Norway", image: norwayImg },
  { country: "Portugal", image: portugalImg },
  { country: "Turkey", image: turkeyImg },
  { country: "USA", image: usaImg },
  { country: "Venezuela", image: venezuelaImg },
  { country: "Ireland", image: irelandImg },
]

function FlagsStrip() {
  return (
    /*
      ACCESSIBILITY: section with aria-label describes the purpose
      of this strip to screen readers. Without the label, a screen
      reader would just say "section" with no context.
    */
    <section aria-label="Browse travel destinations by country">
      <div className="bg-rose-50 py-6 px-8">

        {/*
          ACCESSIBILITY: role="list" is added because we are using
          a div instead of a ul element. This restores list semantics
          that some screen readers need to announce the number of items.
        */}
        <div
          role="list"
          className="flex items-center justify-between flex-wrap gap-4"
        >
          {flags.map((flag) => (
            /*
              ACCESSIBILITY: role="listitem" matches the role="list"
              parent above. Each flag item is announced as a list item
              so users know they are navigating through a collection.
            */
            <div
              key={flag.country}
              role="listitem"
              className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
            >
              {/*
                ACCESSIBILITY: alt text says "Flag of Norway" rather
                than just "Norway". This is more natural for screen
                readers and clearly describes what the image is.
              */}
              <img
                src={flag.image}
                alt={`Flag of ${flag.country}`}
                className="w-12 h-12 rounded-full object-cover"
              />

              {/* ACCESSIBILITY: aria-hidden on "Travel" text because
                  it is the same for every item and adds no unique
                  information. The flag alt text already identifies
                  the country. */}
              <span
                aria-hidden="true"
                className="font-semibold italic text-gray-700"
              >
                Travel
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FlagsStrip