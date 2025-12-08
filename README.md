# GoTravel  - Destination Overview Assistant

##  Why This Project Exists

Planning a trip involves checking dozens of websites for basic information. **GoTravel solves this** by aggregating essential travel data into one intuitive interface, making trip research faster and more enjoyable.

### What It Does
- ** Destination Overview**: Search any country to see flag, capital, population, and region
- ** Weather Intelligence**: Get current conditions and 7-day forecasts with intuitive icons
- **💱 Cost Calculator**: See local currency and real-time exchange rates
- **✈️ Travel Logistics**: Discover major airports and time zones
- ** Visual Inspiration**: Browse beautiful destination photos
- **  Practical Tips**: Language basics and cultural notes

## 🛠️ Tech Stack Deep Dive

### Frontend Foundation
- **Vite + React 18**: Blazing-fast development and optimized production builds
- **Tailwind CSS**: Utility-first styling for rapid, responsive UI development
- **TanStack Query v5**: Sophisticated API state management with built-in caching, retries, and background updates

##  Project Structure

gotravel/
├── src/
│   ├── hooks/                 # Custom React hooks
│   │   └── useDestination.js  # THE BRAIN: Orchestrates all API calls
│   │
│   ├── services/              # API communication layer
│   │   ├── countryService.js
│   │   ├── weatherService.js
│   │   ├── currencyService.js
│   │   └── photoService.js
│   │
│   ├── components/            # Reusable UI components
│   │   ├── widgets/           # Feature-specific cards
│   │   │   ├── WeatherWidget.jsx
│   │   │   ├── CurrencyWidget.jsx
│   │   │   ├── AirportWidget.jsx
│   │   │   └── PhotoWidget.jsx
│   │   │
│   │   ├── layout/            # Page structure
│   │   │   ├── Header.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── MainContainer.jsx
│   │   │
│   │   └── shared/            # UI primitives
│   │       ├── Card.jsx
│   │       ├── LoadingSpinner.jsx
│   │       └── ErrorDisplay.jsx
│   │
│   ├── App.jsx                # Root component
│   └── main.jsx               # Application entry point
│
├── public/                    # Static assets
├── .env.example               # API configuration template
├── vite.config.js             # Build configuration
├── tailwind.config.js         # Tailwind settings
└── README.md                  # This file!


## Quick Start

Clone and install dependencies:
```bash
git clone [your-repo-url]
cd gotravel
npm install