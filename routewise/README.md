# 📍 RouteWise — Travel Planner App

> Turning every destination into an experience worth remembering, guiding you confidently from where you are to where you dream to be.

---

## 🌍 Live Demo

🔗 **[https://vercel.com/loisyys-projects/alx-travel-planner-8ozu/jJuvhH8XnEsBrQsJxrq2YsgnAk9q](https://vercel.com/loisyys-projects/alx-travel-planner-8ozu/jJuvhH8XnEsBrQsJxrq2YsgnAk9q)**

## 📁 Repository

🔗 **[https://github.com/Loisyy/alx-travel-planner.git](https://github.com/Loisyy/alx-travel-planner.git)**

---

## 📖 About The Project

RouteWise is a modern travel planning web application built with **React 19** and **TailwindCSS**, powered by the **Amadeus API**. It allows users to search for destinations anywhere in the world, explore available flights and hotel accommodations, and build personal travel itineraries that persist across sessions.

This project was built as part of the **ALX Frontend Engineering Program**, with a focus on:

- Real-world API integration
- Component-based React architecture
- Responsive design for all screen sizes
- Accessibility (a11y) best practices
- State management with React Context API
- Client-side routing with React Router DOM

---

## 📸 Screenshots

### Homepage
> Hero banner with search, country flags strip, and top visited destinations

### Destinations Search
> Live search results powered by the Amadeus API

### Destination Details
> Flights and hotels tabs for any selected destination

### My Itinerary
> Saved destinations that persist across page refreshes

---

## ✨ Features

- 🔍 **Destination Search** — Search any city or country using the Amadeus API
- ✈️ **Flight Offers** — View available flights to any destination with prices and airlines
- 🏨 **Hotel Listings** — Browse available hotels and accommodations
- 🗺️ **Itinerary Planner** — Save, manage, and revisit your travel plans
- 💾 **Persistent Storage** — Saved trips survive page refreshes via localStorage
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile
- 🍔 **Mobile Navigation** — Animated hamburger menu for smaller screens
- ♿ **Accessibility** — ARIA labels, skip navigation, live regions, semantic HTML
- ⏳ **Loading States** — Spinners and empty states throughout
- ⚠️ **Error Handling** — User friendly messages for all failure scenarios

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool and dev server |
| TailwindCSS | Styling and responsive design |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP requests |
| Amadeus API | Destinations, flights, hotels data |
| localStorage | Itinerary persistence across sessions |
| Vercel | Deployment and hosting |

---

## 📁 Project Structure

```
routewise/
├── public/
├── src/
│   ├── assets/
│   │   └── images/               # Local images (hero, flags, destinations)
│   │       ├── hero-route.jpg
│   │       ├── norway.png
│   │       ├── portugal.png
│   │       ├── turkey.png
│   │       ├── usa.png
│   │       ├── venezuela.png
│   │       ├── ireland.png
│   │       ├── rome.jpg
│   │       ├── paris.jpg
│   │       └── england.jpg
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation with mobile hamburger menu
│   │   ├── Hero.jsx              # Homepage hero banner
│   │   ├── FlagsStrip.jsx        # Country flags section
│   │   ├── TopVisited.jsx        # Top visited destination cards
│   │   ├── SearchBar.jsx         # Reusable search input component
│   │   └── Footer.jsx            # Site footer with links
│   ├── context/
│   │   └── ItineraryContext.jsx  # Global itinerary state + localStorage sync
│   ├── pages/
│   │   ├── Home.jsx              # Homepage — assembles all sections
│   │   ├── Destinations.jsx      # Search results page
│   │   ├── DestinationDetails.jsx # Flights and hotels detail page
│   │   └── Itinerary.jsx         # Saved itinerary page
│   ├── services/
│   │   └── amadeus.js            # All Amadeus API functions
│   ├── App.jsx                   # Routes, layout shell, skip navigation
│   ├── main.jsx                  # App entry point, context providers
│   └── index.css                 # Tailwind directives + global a11y styles
├── .env                          # API keys — never commit this file
├── .gitignore
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)
- A free [Amadeus Developer Account](https://developers.amadeus.com)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Loisyy/alx-travel-planner.git
cd alx-travel-planner/routewise
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root of the project:

```env
VITE_AMADEUS_API_KEY=your_api_key_here
VITE_AMADEUS_API_SECRET=your_api_secret_here
```

> See the [Amadeus API Setup](#-amadeus-api-setup) section below for how to get these keys.

**4. Start the development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Amadeus API Setup

1. Go to [developers.amadeus.com](https://developers.amadeus.com)
2. Sign up for a **free account**
3. Click **"Create new app"**
4. Copy your **API Key** and **API Secret**
5. Paste them into your `.env` file as shown above

### API Endpoints Used

| Feature | Endpoint |
|---|---|
| Get access token | `POST /v1/security/oauth2/token` |
| Search destinations | `GET /v1/reference-data/locations?keyword={city}&subType=CITY` |
| Search flights | `GET /v2/shopping/flight-offers?originLocationCode={origin}&destinationLocationCode={dest}&departureDate={date}&adults=1` |
| Search hotels | `GET /v1/reference-data/locations/hotels/by-city?cityCode={code}` |

> **Note:** The free Amadeus **test environment** may return limited or mock data for some cities. Apply for a production key on their developer portal for live data.

---

## 📱 Pages and Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero banner, search bar, flags strip, top visited cards |
| `/destinations?search=Paris` | Destinations | Live search results from Amadeus API |
| `/destination/:cityCode` | Destination Details | Flights and hotels tabs for a selected city |
| `/itinerary` | Itinerary | User's saved destinations |

---

## 🧠 How It Works

### API Authentication
Amadeus uses **OAuth2 client credentials flow**. Before every API call, the app fetches a short-lived access token by sending the API key and secret. This token is then included as a `Bearer` token in all subsequent requests.

### Search Flow
1. User types a city in the search bar and submits
2. App navigates to `/destinations?search=cityname`
3. `Destinations.jsx` reads the query from the URL using `useSearchParams`
4. Calls `searchDestinations()` from `services/amadeus.js`
5. Results render as destination cards
6. Clicking **Explore** navigates to `/destination/:cityCode` passing data via React Router state

### Itinerary Flow
1. On the details page the user clicks **Save to Itinerary**
2. Destination is added to global context via `ItineraryContext`
3. Context `useEffect` syncs the updated array to `localStorage`
4. User visits `/itinerary` to view, revisit, or remove saved destinations
5. On page refresh, state is restored from `localStorage` automatically

### Accessibility Features
- **Skip navigation link** — keyboard users can jump past the navbar
- **Semantic HTML** — `header`, `nav`, `main`, `section`, `article`, `footer` landmarks
- **ARIA labels** — every button, input and interactive element is described
- **ARIA live regions** — loading states and errors are announced to screen readers
- **Focus styles** — visible pink outline on all focused elements for keyboard navigation
- **Reduced motion** — animations disabled for users with vestibular sensitivity
- **Dynamic page titles** — each page sets a unique `document.title` via `useEffect`
- **Descriptive alt text** — all images have meaningful descriptions

---

## 🏗️ Building for Production

```bash
npm run build
```

The output goes into the `dist/` folder, ready to deploy.

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment

This project is deployed on **Vercel**.

### Deploy your own copy

1. Fork this repository on GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **"Add New Project"** and import your forked repo
4. Add your environment variables in the Vercel dashboard:
   - `VITE_AMADEUS_API_KEY`
   - `VITE_AMADEUS_API_SECRET`
5. Click **Deploy**

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore` to prevent accidental exposure of your API credentials.

---

## 🔧 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at localhost:5173 |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |

---

## ♿ Accessibility

RouteWise was built with accessibility as a first-class concern following **WCAG 2.1** guidelines:

- All interactive elements are keyboard accessible
- Screen reader announcements for loading, errors, and state changes
- Skip navigation link for keyboard-only users
- Proper heading hierarchy (`h1` → `h2` → `h3`) throughout
- Color contrast ratios meet AA standards
- Reduced motion support via `prefers-reduced-motion` media query
- All form inputs have associated visible or screen-reader labels
- Tab panels follow the ARIA `tablist` / `tab` / `tabpanel` pattern

---

## ⚠️ Known Limitations

- The Amadeus **test environment** returns limited or mock data for some cities
- Flight search uses **London (LON)** as the default origin — making this user-configurable is a planned improvement
- Itinerary data is stored in **localStorage** and is device-specific — it does not sync across devices or browsers
- The app requires a valid Amadeus API key to fetch live data

---

## 🗺️ Roadmap

- [ ] User-configurable flight origin city
- [ ] Weather forecast for destinations using OpenWeatherMap API
- [ ] User authentication — login and cross-device itinerary sync
- [ ] Budget planner and expense tracker
- [ ] Social sharing of itineraries via shareable links
- [ ] Dark mode
- [ ] Map view for destinations
- [ ] Route optimization between multiple destinations

---

## 🤝 Contributing

Pull requests are welcome. For major changes please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch — `git checkout -b feature/amazing-feature`
3. Commit your changes — `git commit -m "add amazing feature"`
4. Push to the branch — `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

Built by **Loisy**

- GitHub: [@Loisyy](https://github.com/Loisyy)
- Repository: [alx-travel-planner](https://github.com/Loisyy/alx-travel-planner.git)
- Live Demo: [RouteWise on Vercel](https://vercel.com/loisyys-projects/alx-travel-planner-8ozu/jJuvhH8XnEsBrQsJxrq2YsgnAk9q)

---

## 🙏 Acknowledgements

- [Amadeus for Developers](https://developers.amadeus.com) — travel data API
- [TailwindCSS](https://tailwindcss.com) — utility-first CSS framework
- [React Router](https://reactrouter.com) — client-side routing
- [Vite](https://vitejs.dev) — lightning fast build tool
- [Vercel](https://vercel.com) — deployment and hosting
- [ALX Africa](https://www.alxafrica.com) — frontend engineering program

---

> Made with ❤️ and ☕ as part of the ALX Frontend Engineering Program