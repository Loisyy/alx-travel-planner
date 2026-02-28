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
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 bg-white rounded-full shadow-md px-4 py-2 w-full max-w-xl mx-auto"
    >
      <span className="text-gray-400">🔍</span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search destinations e.g. Paris, Rome..."
        className="flex-1 outline-none text-gray-700 text-sm"
      />
      <button
        type="submit"
        className="bg-pink-500 text-white px-5 py-1.5 rounded-full text-sm hover:bg-pink-600"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar