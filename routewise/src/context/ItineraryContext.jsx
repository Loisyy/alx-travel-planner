import { createContext, useContext, useState, useEffect } from "react"

const ItineraryContext = createContext()

//This is called lazy initialization (because you passed a function to useState).
export function ItineraryProvider({ children }) {
  const [itinerary, setItinerary] = useState(() => {
    const saved = localStorage.getItem("routewise-itinerary")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("routewise-itinerary", JSON.stringify(itinerary))
  }, [itinerary])

  const addToItinerary = (item) => {
    const exists = itinerary.find((i) => i.id === item.id)
    if (exists) return
    setItinerary((prev) => [...prev, item])
  }

  const removeFromItinerary = (id) => {
    setItinerary((prev) => prev.filter((i) => i.id !== id))
  }

  const clearItinerary = () => setItinerary([])

  return (
    <ItineraryContext.Provider
      value={{ itinerary, addToItinerary, removeFromItinerary, clearItinerary }}
    >
      {children}
    </ItineraryContext.Provider>
  )
}

export function useItinerary() {
  return useContext(ItineraryContext)
}