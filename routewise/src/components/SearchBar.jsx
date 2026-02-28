import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SearchBar() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/destinations?search=${query}`)
    }
  }

  return (
    /*
      ACCESSIBILITY: role="search" is a landmark role that marks this
      as a search region. Screen reader users can jump directly to the
      search form using landmark navigation. Without this role it is
      just an anonymous form element with no special meaning.
    */
    <form
      role="search"
      onSubmit={handleSearch}
      className="flex items-center gap-2 bg-white rounded-full shadow-md px-4 py-2 w-full max-w-xl mx-auto"
    >

      {/*
        ACCESSIBILITY: aria-hidden on the search icon because it is
        decorative. The input's label and placeholder already
        communicate the purpose of this form. Reading the emoji
        out loud would be confusing and redundant.
      */}
      <span aria-hidden="true" className="text-gray-400">🔍</span>

      {/*
        ACCESSIBILITY: visually hidden label associated with the input
        via htmlFor and id. Screen readers always look for a label
        when they land on an input. placeholder text alone is not
        sufficient because it disappears when the user starts typing
        and some screen readers do not read placeholder at all.
        sr-only hides it visually but keeps it in the DOM for
        assistive technologies.
      */}
      <label htmlFor="destination-search" className="sr-only">
        Search for a destination
      </label>

      <input
        id="destination-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search destinations e.g. Paris, Rome..."
        /*
          ACCESSIBILITY: aria-label reinforces the input purpose.
          type="search" tells browsers and screen readers this is a
          search field — some browsers add a clear button automatically
          and screen readers announce it as a search field rather than
          a plain text field.
        */
        aria-label="Search for a destination"
        className="flex-1 outline-none text-gray-700 text-sm"
      />

      {/*
        ACCESSIBILITY: aria-label on the button describes the action
        clearly. "Search" alone is acceptable here since the input
        label already provides the context of what is being searched.
        type="submit" is explicit so assistive technologies know this
        button submits the form.
      */}
      <button
        type="submit"
        aria-label="Search destinations"
        className="bg-pink-500 text-white px-5 py-1.5 rounded-full text-sm hover:bg-pink-600"
      >
        Search
      </button>

    </form>
  )
}

export default SearchBar