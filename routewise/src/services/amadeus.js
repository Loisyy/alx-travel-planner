const API_KEY = import.meta.env.VITE_AMADEUS_API_KEY
const API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET

// ── Token cache ──
let cachedToken = null
let tokenExpiry = null

export async function getAccessToken() {
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry - 30000) {
    return cachedToken
  }

  const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
  })

  const data = await response.json()

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || `Auth failed: ${response.status}`)
  }

  cachedToken = data.access_token
  tokenExpiry = Date.now() + (data.expires_in * 1000)
  return cachedToken
}

// ── City search via OpenStreetMap Nominatim ──
// Free, no API key needed, extremely reliable
export async function searchDestinations(keyword) {
  if (!keyword?.trim()) return []

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(keyword)}&format=json&addressdetails=1&limit=15&featuretype=city`,
    {
      headers: {
        "Accept-Language": "en",
        "User-Agent": "RouteWise/1.0 (travel planner app)"
      }
    }
  )

  if (!res.ok) throw new Error(`City search failed: ${res.status}`)

  const data = await res.json()

  // Filter to cities/towns only and normalise to the shape your app expects
  const seen = new Set()
  return data
    .filter(item => {
      const type = item.type || item.addresstype || item.class
      return ["city", "town", "village", "municipality", "administrative"].includes(type) ||
             item.class === "place" ||
             item.addresstype === "city"
    })
    .filter(item => {
      // Deduplicate by city name
      const key = (item.name || "").toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .map((item, index) => {
      const cityName = item.address?.city ||
                       item.address?.town ||
                       item.address?.village ||
                       item.address?.municipality ||
                       item.name ||
                       ""
      const countryName = item.address?.country || ""
      const countryCode = (item.address?.country_code || "").toUpperCase()

      // Generate a city code from the name (3 uppercase letters)
      const rawCode = item.address?.["ISO3166-2-lvl4"] ||
                      item.address?.["ISO3166-2-lvl6"] ||
                      cityName.slice(0, 3).toUpperCase().replace(/[^A-Z]/g, "X")

      return {
        id: item.place_id?.toString() || `osm-${index}`,
        name: cityName || item.name,
        iataCode: rawCode,
        address: {
          cityName,
          cityCode: rawCode,
          countryName,
          countryCode,
        },
        geoCode: {
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon),
        },
      }
    })
    .filter(item => item.name) // remove any blanks
}

// ── Flights — Amadeus ──
export async function searchFlights(origin, destination, date, adults = 1) {
  const token = await getAccessToken()

  const res = await fetch(
    `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=${adults}&max=10`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  const data = await res.json()

  if (!res.ok || data.errors) {
    throw new Error(data.errors?.[0]?.detail || `Flight search failed: ${res.status}`)
  }

  return data.data || []
}

// ── Hotels — Amadeus ──
export async function searchHotels(cityCode) {
  const token = await getAccessToken()

  const res = await fetch(
    `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=5&radiusUnit=KM&hotelSource=ALL`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  const data = await res.json()

  if (!res.ok || data.errors) {
    throw new Error(data.errors?.[0]?.detail || `Hotel search failed: ${res.status}`)
  }

  return data.data || []
}