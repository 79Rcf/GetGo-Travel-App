import React from 'react';

const CountryCard = ({ country }) => {
  if (!country) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-500">Country data not available</p>
      </div>
    );
  }

  const formatNumber = (num) => num?.toLocaleString() || 'N/A';
  const formatList = (items) => items?.join(', ') || 'N/A';
  const formatObjectKeys = (obj) => obj ? Object.keys(obj).join(', ') : 'N/A';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with Flag and Basic Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-shrink-0">
            <img 
              src={country.flags?.png} 
              alt={`Flag of ${country.name?.common}`}
              className="w-32 h-auto border-4 border-white shadow-lg rounded-lg"
            />
            {country.coatOfArms?.png && (
              <div className="mt-2 text-center">
                <img 
                  src={country.coatOfArms.png} 
                  alt="Coat of Arms"
                  className="w-16 h-16 mx-auto object-contain"
                />
                <p className="text-xs text-gray-600 mt-1">Coat of Arms</p>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{country.name?.common}</h1>
                <h2 className="text-xl text-gray-600">{country.name?.official}</h2>
                <div className="flex items-center gap-2 mt-2">
                  {country.cca2 && (
                    <span className="bg-gray-100 text-gray-800 text-xs font-mono px-2 py-1 rounded">
                      {country.cca2}
                    </span>
                  )}
                  {country.cca3 && (
                    <span className="bg-gray-100 text-gray-800 text-xs font-mono px-2 py-1 rounded">
                      {country.cca3}
                    </span>
                  )}
                  {country.cioc && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      {country.cioc}
                    </span>
                  )}
                </div>
              </div>
              {country.independent !== undefined && (
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  country.independent 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {country.independent ? 'Independent' : 'Dependent'}
                </span>
              )}
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Capital</p>
                <p className="font-semibold">{formatList(country.capital)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Region</p>
                <p className="font-semibold">{country.region} {country.subregion && `• ${country.subregion}`}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Population</p>
                <p className="font-semibold">{formatNumber(country.population)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Geography & Location */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-800 border-b pb-2">Geography</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Area</p>
                <p className="font-medium">{formatNumber(country.area)} km²</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Coordinates</p>
                <p className="font-mono text-sm">{country.latlng?.join(', ') || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time Zones</p>
                <p className="font-medium">{formatList(country.timezones)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Borders</p>
                <p className="font-medium">
                  {country.borders?.length > 0 
                    ? `${country.borders.length} countries` 
                    : 'No land borders'}
                </p>
              </div>
            </div>
          </div>

          {/* Culture & Language */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-800 border-b pb-2">Culture & Language</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Languages</p>
                <p className="font-medium">{formatObjectKeys(country.languages)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Currencies</p>
                <p className="font-medium">{formatObjectKeys(country.currencies)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Demonyms</p>
                <p className="font-medium">
                  {country.demonyms?.eng?.f || 'N/A'} (female), {country.demonyms?.eng?.m || 'N/A'} (male)
                </p>
              </div>
            </div>
          </div>

          {/* Maps & International */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-800 border-b pb-2">Maps & International</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Maps</p>
                <div className="flex gap-2 mt-1">
                  {country.maps?.googleMaps && (
                    <a 
                      href={country.maps.googleMaps} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <span>🗺️</span> Google Maps
                    </a>
                  )}
                  {country.maps?.openStreetMaps && (
                    <a 
                      href={country.maps.openStreetMaps} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <span>🗺️</span> OpenStreetMap
                    </a>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">UN Member</p>
                <p className={`font-medium ${country.unMember ? 'text-green-600' : 'text-gray-600'}`}>
                  {country.unMember ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Car Side</p>
                <p className="font-medium">{country.car?.side?.toUpperCase()} side</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start of Week</p>
                <p className="font-medium capitalize">{country.startOfWeek || 'N/A'}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Fun Facts Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Interesting Facts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Continent</p>
              <p className="font-semibold text-blue-800">
                {country.continents?.join(', ') || 'N/A'}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Landlocked</p>
              <p className="font-semibold text-green-800">
                {country.landlocked ? 'Yes' : 'No'}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">FIFA</p>
              <p className="font-semibold text-purple-800">
                {country.fifa || 'Not a FIFA member'}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">TLD</p>
              <p className="font-semibold text-yellow-800">
                {formatList(country.tld)}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {country.idd?.root && (
              <div className="flex items-center gap-1">
                <span>📞</span>
                <span>Dialing Code: {country.idd.root}{country.idd.suffixes?.[0]}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span>Lat/Long: {country.latlng?.[0]?.toFixed(2)}°, {country.latlng?.[1]?.toFixed(2)}°</span>
            </div>
            <div className="flex items-center gap-1">
              <span>👥</span>
              <span>Density: {country.area && country.population ? 
                Math.round(country.population / country.area) : 'N/A'} people/km²</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;