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
    <div className="bg-rose-50 py-6 px-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {flags.map((flag) => (
          <div
            key={flag.country}
            className="flex items-center gap-0 cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={flag.image}
              alt={flag.country}
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="font-semibold italic text-gray-700 -skew-x-12 inline-block">{flag.country}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


export default FlagsStrip