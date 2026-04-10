import { useEffect } from "react"
import Hero from "../components/Hero"
import CountryMarquee from "../components/CountryMarquee"
import TopVisited from "../components/TopVisited"

function Home() {

  /* ACCESSIBILITY: sets unique page title so screen readers
     announce where the user is when the page loads */
  useEffect(() => {
    document.title = "RouteWise — Plan Your Next Adventure"
  }, [])

  return (
    <>
      <Hero />
      <CountryMarquee />
      <TopVisited />
    </>
  )
}

export default Home