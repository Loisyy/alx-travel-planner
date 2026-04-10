import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) navigate(`/destinations?search=${trimmedQuery}`);
  };

  return (
    <form
      role="search"
      onSubmit={handleSearch}
      className="flex items-center w-full max-w-xl bg-white/90 backdrop-blur-sm rounded-full px-5 py-2 shadow-lg transition-all duration-300 hover:shadow-2xl focus-within:shadow-2xl focus-within:-translate-y-0.5"
    >
      {/* Search Icon */}
      <span aria-hidden="true" className="text-gray-400 flex items-center shrink-0 mr-3 transition-transform duration-300 group-focus-within:text-[#FF7F7F]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </span>

      {/* Input */}
      <div className="relative flex-1">
        <input
          id="destination-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder=" "
          className="w-full bg-transparent border-none outline-none text-gray-800 text-sm placeholder-transparent peer"
          aria-label="Search for a destination"
        />
        <label
          htmlFor="destination-search"
          className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-[#FF7F7F] peer-focus:text-xs"
        >
          Where do you want to go?
        </label>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        aria-label="Search destinations"
        className="ml-3 shrink-0 bg-[#FF7F7F] hover:bg-[#df6e6e] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;