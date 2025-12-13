import { useState } from "react";
import useDestination from "../../hooks/useDestination";
import Header from "../../components/header/header";
import Map from "../../components/map/Map";
import WeatherCard from "../../components/weatherCard/weatherCard";
import AviationCard from "../../components/avaitionStackCard/avaitionCard";
import CountryCard from "../../components/countryCard/CountryCard";
import CurrencyConverter from "../../components/currency/currencyconverter";
import PaginatedPlaceDetails from "../../components/PaginatedDetails/PaginatedPlaceDetails";
import TourCard from "../../components/tour/TourCard";

const Dashboard = () => {
  const [countryName, setCountryName] = useState("nigeria");

  const {
    country,
    weather,
    currency,
    airports,
    places,
    placeDetails, 
    isLoading,
    isError,
    error,
  } = useDestination(countryName);
  
  const TailwindSpinner = ({ size = "medium" }) => {
    const sizeClasses = {
      small: "w-6 h-6 border-2",
      medium: "w-12 h-12 border-4",
      large: "w-16 h-16 border-6"
    };
  
    return (
      <div className={`${sizeClasses[size]} border-gray-200 border-t-blue-500 rounded-full animate-spin`}></div>
    );
  };
  
  const handleSearch = (searchTerm) => {
    setCountryName(searchTerm);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Header onSearch={handleSearch} />
        <div className="flex flex-col justify-center items-center h-64">
          <TailwindSpinner size="large" />
          <p className="mt-4 text-xl">Loading data for {countryName}...</p>
        </div>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Header onSearch={handleSearch} />
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
          <h3 className="text-red-800 font-bold">Error</h3>
          <p className="text-red-600">{error?.message || "An error occurred"}</p>
          <p className="text-sm mt-2">Try searching for another country.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} currentCountry={countryName} />
      <main className="container mx-auto p-4">
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
                  {country.name?.common || "Unknown Country"}
                </h1>
                <p className="text-gray-600">
                  {country.capital?.[0] || "No capital"} •{" "}
                  {country.region || "Unknown region"} • Population:{" "}
                  {(country.population || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
  
        {country && <CountryCard country={country} />}
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 mt-8">
          {weather && (
            <div className="md:col-span-1">
              <WeatherCard weather={weather} />
            </div>
          )}
  
          {currency && country?.currencies && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold">Currency</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Live
                </span>
              </div>
              <div className="mb-3">
                <div className="text-xs text-gray-500">USD → {Object.keys(country.currencies)[0]}</div>
                <div className="text-lg font-bold text-blue-700">
                  1 = {currency.conversion_rates?.[Object.keys(country.currencies)[0]]?.toFixed(4) || 'N/A'}
                </div>
              </div>
              <p className="text-xs text-gray-500">
                {Object.values(country.currencies)[0]?.name}
              </p>
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
  
        {currency && country?.currencies && (
          <div className="mb-8">
            <CurrencyConverter
              baseCurrency="USD"
              targetCurrency={Object.keys(country.currencies)[0]}
              rate={currency.conversion_rates?.[Object.keys(country.currencies)[0]]}
            />
          </div>
        )}
  
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
                <h2 className="text-2xl font-bold">Top Attractions in {country?.name?.common}</h2>
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
  <TourCard countryName={country?.name?.common || 'this destination'} />
</div>
      </main>
    </div>
  );
}


export default Dashboard;