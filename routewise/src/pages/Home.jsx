import Hero from '../components/Hero'
import FlagsStrip from '../components/FlagsStrip'
import TopVisited from '../components/TopVisited'
import SearchBar from '../components/SearchBar'

function Home() {
  return (
    <div>
      <Hero />
      <div className="py-8 px-8 bg-gray-50">
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
          Where do you want to go?
        </h2>
        <SearchBar />
      </div>
      <FlagsStrip />
      <TopVisited />
    </div>
  )
}

export default Home