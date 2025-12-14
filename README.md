# GoTravel  - Destination Overview Assistant

##  Why This Project Exists

Planning a trip involves checking dozens of websites for basic information. **GoTravel solves this** by aggregating essential travel data into one intuitive interface, making trip research faster and more enjoyable combinning more than 2 diffrent api service to get the faster result the main aim of this project was to get are hands durty trying to understand how api's work and how we can use them to our benefit as developers.

### What It Does
- ** Destination Overview**: Search any country to see flag, capital, population, and region
- ** Weather Intelligence**: Get current conditions and 7-day forecasts with intuitive icons
- **  Cost Calculator**: See local currency and real-time exchange rates
- **  Travel Logistics**: Discover major airports and time zones
- ** Visual Inspiration**: Browse beautiful destination photos
- **  Practical Tips**: Language basics and cultural notes

##  Tech Stack Deep Dive

- ## this is base only on the frontend using Vite for faster building development

### Frontend Foundation
- **Vite + React 18**: Blazing-fast development and optimized production builds
- **Tailwind CSS**: Utility-first styling for rapid, responsive UI development
- **TanStack Query v5**: Sophisticated API state management with built-in caching, retries, and background updates

##  Project Structure

gotravel/
src/
├── components
    └── maps
    └── Header
    └── cards
    └── placeDetails
    └── countrycard
    └──currencycard
    └──avationstackCard
    └──paginationDetails
    └── spinner
    └── ui
    └── weatherCard
    └── tour
    
├── hooks/
│   └── useDestination.jsx
    └── useUserLocation.jsx
├── utils
    └── services/
│   ├── countryService.js       ← Your REST Countries function
│   ├── weatherService.js       ← Open-Meteo function
│   ├── currencyService.js      ← ExchangeRate-API function
│   ├── airportService.js       ← Aviationstack function
│   └── placesService.js        ← Your fixed Geoapify function
└── App.jsx                     ← Your main component

├── .env                      # API configuration template
├── vite.config.js             # Build configuration
├── tailwind.config.js         # Tailwind settings



## Quick Start

Clone and install dependencies:
```bash
git clone [your-repo-url]
cd gotravel
npm install