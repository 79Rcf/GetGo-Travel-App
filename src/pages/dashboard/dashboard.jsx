import { useState } from "react";
import useDestination from "../../hooks/useDestination";
import useUserLocation from "../../hooks/useUserLocation";
import Header from "../../components/header/header";
import Map from "../../components/map/Map";
import WeatherCard from "../../components/weatherCard/weatherCard";
import AviationCard from "../../components/avaitionStackCard/avaitionCard";
import CountryCard from "../../components/countryCard/CountryCard";
import CurrencyConverter from "../../components/currency/CurrencyConverter";
import PaginatedPlaceDetails from "../../components/PaginatedDetails/PaginatedPlaceDetails";
import TourCard from "../../components/tour/TourCard";


const Dashboard = () => {
  const [countryName, setCountryName] = useState(null);
  const {
    userLocation,
    locationError,
    isLoading: locationLoading,
    refreshLocation,
  } = useUserLocation();

  const {
    country,
    weather,
    currency,
    airports,
    places,
    placeDetails,
    tours,
    searchCountryName,
    currencyCode,
    isLoading: destinationLoading,
    isError,
    error,
  } = useDestination(countryName, userLocation);

  const isLoading = locationLoading || destinationLoading;

  const handleSearch = (searchTerm) => {
    setCountryName(searchTerm);
  };

  const targetCurrencyCode =
    currencyCode ||
    (country?.currencies ? Object.keys(country.currencies)[0] : null);

  const handleUseMyLocation = () => {
    setCountryName(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Header onSearch={handleSearch} />
        <div className="flex flex-col justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-xl">
            {locationLoading
              ? "Detecting your location..."
              : "Loading travel data..."}
          </p>
          {locationLoading && (
            <p className="text-sm text-gray-500 mt-2">
              Please allow location access
            </p>
          )}
        </div>
      </div>
    );
  }

  const displayError = locationError || (isError ? error?.message : null);

  const weatherCardLocationName =
    searchCountryName || country?.name?.common || "Location Unknown";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        currentCountry={countryName || country?.name?.common || "Near You"}
        onUseMyLocation={handleUseMyLocation}
      />

      <main className="container mx-auto p-4">
        {locationError && !isError && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-yellow-800 mr-2">📍</span>
              <div>
                <p className="text-yellow-800">{locationError}</p>
                <p className="text-sm text-yellow-600 mt-1">
                  Showing attractions near{" "}
                  {country?.name?.common || "default location"}
                </p>
              </div>
            </div>
          </div>
        )}

        {!countryName && userLocation && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div>
                  <p className="font-medium text-blue-800">
                    Showing attractions near you
                  </p>
                  <p className="text-sm text-blue-600">
                    Based on your current location •
                    <button
                      onClick={refreshLocation}
                      className="ml-1 underline hover:text-blue-800"
                    >
                      Refresh location
                    </button>
                  </p>
                </div>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Local Mode
              </span>
            </div>
          </div>
        )}

        {country && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-4">
              <img
                src={country.flags?.png}
                alt={`Flag of ${country.name?.common}`}
                className="w-20 h-auto border"
              />
              <div>
                <h1 className="text-3xl font-bold">
                  {country.name?.common || "Near You"}
                </h1>
                <p className="text-gray-600">
                  {!countryName
                    ? "Attractions near your location"
                    : `${country.capital?.[0]} • ${country.region}`}
                  {country.population &&
                    ` • Population: ${country.population.toLocaleString()}`}
                </p>
                {!countryName && userLocation && (
                  <p className="text-sm text-gray-500 mt-1">
                    Coordinates: {userLocation.lat?.toFixed(4)}°,{" "}
                    {userLocation.lon?.toFixed(4)}°
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {country && <CountryCard country={country} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 mt-8">
          {weather && (
            <div className="md:col-span-1">
              <WeatherCard
                weather={weather}
                locationName={weatherCardLocationName}
              />
            </div>
          )}

          {currency && targetCurrencyCode && (
            <div className="md:col-span-1">
              <CurrencyConverter
                baseCurrency="USD"
                targetCurrency={targetCurrencyCode}
                rate={currency.conversion_rates?.[targetCurrencyCode]}
              />
            </div>
          )}

          {airports && airports.length > 0 && (
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-2">Recent Flights</h3>
              <p className="text-3xl font-bold text-blue-600">
                {airports.length}
              </p>
              <p className="text-sm text-gray-600">active flights tracked</p>
              <button
                onClick={() =>
                  document
                    .getElementById("full-aviation-card")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-blue-500 text-sm mt-2 hover:underline"
              >
                View all flight details →
              </button>
            </div>
          )}
        </div>

        {country?.latlng && places && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Explore {country.name?.common} on Map
            </h2>
            <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
              <Map center={country.latlng} places={places} />
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500">
                Showing {places.length} attractions in the area
              </p>
              <div className="flex gap-2">
                <span className="flex items-center text-xs">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                  Tourist Attractions
                </span>
                <span className="flex items-center text-xs">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                  Current Location
                </span>
              </div>
            </div>
          </div>
        )}

        {airports && airports.length > 0 && (
          <div id="full-aviation-card" className="mb-8">
            <AviationCard flightData={airports} />
          </div>
        )}

        {places && places.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Top Attractions in {country?.name?.common}
                </h2>
                <p className="text-gray-600 mt-1">
                  Discover the best places to visit
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {places.length} total
                </span>
              </div>
            </div>

            <PaginatedPlaceDetails
              places={places}
              placeDetails={placeDetails || []}
              initialVisible={6}
              increment={3}
            />
          </div>
        )}

        <div className="mt-8">
          <TourCard
            countryName={country?.name?.common || "this destination"}
            tours={tours}
            isLoading={destinationLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
