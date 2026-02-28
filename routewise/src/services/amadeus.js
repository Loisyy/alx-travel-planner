const API_KEY = import.meta.env.VITE_AMADEUS_API_KEY
const API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET

export async function getAccessToken() {
  const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
  })
  const data = await response.json()
  return data.access_token
}

export async function searchDestinations(keyword) {
  const token = await getAccessToken()
  const response = await fetch(
    `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${keyword}&subType=CITY`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  const data = await response.json()
  return data.data
}

export async function searchFlights(origin, destination, date) {
  const token = await getAccessToken()
  const response = await fetch(
    `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1&max=5`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  const data = await response.json()
  return data.data
}

export async function searchHotels(cityCode) {
  const token = await getAccessToken()
  const response = await fetch(
    `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  const data = await response.json()
  return data.data
}