import { Helmet } from "react-helmet-async"
import Hero from "../components/Hero"
import FlagsStrip from "../components/FlagsStrip"
import TopVisited from "../components/TopVisited"
import SearchBar from "../components/SearchBar"

function Home() {
  return (
    /*
      ACCESSIBILITY: Fragment shorthand <> wraps multiple elements
      without adding an extra DOM node. Helmet must be a sibling of
      the page content, not a wrapper around it.
    */
    <>
      {/*
        ACCESSIBILITY: Helmet sets the document title for this page.
        The title is the very first thing a screen reader announces
        when a page loads. It also appears in the browser tab so
        sighted users can identify the page at a glance.
        Format: "Page Name — Site Name" is the recommended pattern.
      */}
      <Helmet>
        <title>RouteWise — Plan Your Next Adventure</title>
        {/*
          ACCESSIBILITY: meta description helps screen reader users
          and search engines understand the page purpose before
          engaging with the content.
        */}
        <meta
          name="description"
          content="RouteWise helps you search destinations, find flights and hotels, and plan your perfect travel itinerary."
        />
      </Helmet>

      <Hero />

      {/*
        ACCESSIBILITY: section with aria-label describes this search
        area as a landmark. Screen reader users navigating by
        landmarks will find and jump to this section easily.
      */}
      <section aria-label="Destination search" className="py-8 px-8 bg-gray-50">
        {/*
          ACCESSIBILITY: h2 gives the search section a visible heading
          that also acts as a label for the section. Screen readers
          use headings to build a page outline for users.
        */}
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