import { useEffect } from "react"
import Hero from "../components/Hero"
import FlagsStrip from "../components/FlagsStrip"
import TopVisited from "../components/TopVisited"
import SearchBar from "../components/SearchBar"

function Home() {

  /* ACCESSIBILITY: sets unique page title so screen readers
     announce where the user is when the page loads */
  useEffect(() => {
    document.title = "RouteWise — Plan Your Next Adventure"
  }, [])

  return (
    <>
      <Hero />
      <section aria-label="Destination search" className="py-8 px-8 bg-gray-50">
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
          Where do you want to go?
        </h2>
        <SearchBar />
      </section>
      <FlagsStrip />
      <TopVisited />
    </>
  )
}

export default Home