const API_KEY = import.meta.env.VITE_AMADEUS_API_KEY
const API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET

export async function getAccessToken() {
  if (!API_KEY || !API_SECRET) {
    console.error("[v0] Missing Amadeus API credentials. Please set VITE_AMADEUS_API_KEY and VITE_AMADEUS_API_SECRET environment variables.")
    throw new Error("Missing API credentials")
  }

  const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
  })

  if (!response.ok) {
    const errorData = await response.text()
    console.error("[v0] Token request failed:", response.status, errorData)
    throw new Error(`Token request failed: ${response.status}`)
  }

  const data = await response.json()
  if (!data.access_token) {
    console.error("[v0] No access token in response:", data)
    throw new Error("No access token received")
  }
  return data.access_token
}

export async function searchDestinations(keyword) {
  try {
    const token = await getAccessToken()
    const response = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${keyword}&subType=CITY`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("[v0] Search destinations failed:", response.status, errorData)
      throw new Error(`Search failed: ${response.status}`)
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error("[v0] searchDestinations error:", error)
    throw error
  }
}

export async function searchFlights(origin, destination, date) {
  try {
    const token = await getAccessToken()
    const response = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1&max=5`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("[v0] Search flights failed:", response.status, errorData)
      throw new Error(`Search failed: ${response.status}`)
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error("[v0] searchFlights error:", error)
    throw error
  }
}

export async function searchHotels(cityCode) {
  try {
    const token = await getAccessToken()
    const response = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("[v0] Search hotels failed:", response.status, errorData)
      throw new Error(`Search failed: ${response.status}`)
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error("[v0] searchHotels error:", error)
    throw error
  }
}
