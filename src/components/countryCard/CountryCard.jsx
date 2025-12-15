import React, { useState } from 'react';
import { MapPin, Users, Globe, TrendingUp, Award, Languages, Map, Flag, Heart, Navigation, Phone, Clock } from 'lucide-react';

const CountryCard = ({ country }) => {
  const [isLiked, setIsLiked] = useState(false);

  if (!country) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <p className="text-gray-500">Country data not available</p>
      </div>
    );
  }

  const formatNumber = (num) => num?.toLocaleString() || 'N/A';
  const formatList = (items) => items?.join(', ') || 'N/A';
  const formatObjectKeys = (obj) => obj ? Object.keys(obj).join(', ') : 'N/A';
  const formatObjectValues = (obj) => obj ? Object.values(obj).join(', ') : 'N/A';

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section */}
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl group">
        <div className="absolute inset-0 bg-white border border-gray-200"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
        
        <div className="relative h-auto min-h-[280px] md:h-96 flex flex-col md:flex-row items-center justify-between p-4 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full">
            {/* Flag Section */}
            <div className="relative group-hover:scale-105 transition-transform duration-300 order-1 md:order-1">
              <img 
                src={country.flags?.png} 
                alt={`Flag of ${country.name?.common}`}
                className="w-32 h-auto md:w-52 shadow-xl md:shadow-2xl rounded-xl md:rounded-2xl border-2 md:border-4 border-white/50"
              />
              {country.coatOfArms?.png && (
                <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-12 h-12 md:w-20 md:h-20 bg-white rounded-full p-1 md:p-2 shadow-lg">
                  <img 
                    src={country.coatOfArms.png} 
                    alt="Coat of Arms"
                    className="w-full h-full object-contain text-black"
                  />
                </div>
              )}
            </div>
            
            {/* Country Info */}
            <div className="text-black flex-1 order-2 md:order-2 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 md:gap-3 mb-3">
                <span className="bg-gray-200 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold text-black">
                  {country.region}
                </span>
                {country.subregion && (
                  <span className="bg-gray-200 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold text-black">
                    {country.subregion}
                  </span>
                )}
                {country.independent !== undefined && (
                  <span className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold flex items-center gap-1 ${
                    country.independent 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    <Award className="w-3 h-3 md:w-4 md:h-4" />
                    {country.independent ? 'Independent' : 'Dependent'}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-6xl font-bold mb-2 text-black">{country.name?.common}</h1>
              <h2 className="text-base md:text-2xl text-gray-700 mb-4">{country.name?.official}</h2>
              
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-6 text-sm md:text-lg text-black">
                {country.capital && country.capital[0] && (
                  <div className="flex items-center gap-1 md:gap-2">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                    <span>{formatList(country.capital)}</span>
                  </div>
                )}
                {country.population && (
                  <div className="flex items-center gap-1 md:gap-2">
                    <Users className="w-4 h-4 md:w-5 md:h-5" />
                    <span>{formatNumber(country.population)}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap justify-center md:justify-start items-center gap-1 md:gap-2 mt-3 md:mt-4">
                {country.cca2 && (
                  <span className="bg-gray-200 backdrop-blur-sm text-black text-xs font-mono px-2 py-1 md:px-3 md:py-1 rounded-full">
                    {country.cca2}
                  </span>
                )}
                {country.cca3 && (
                  <span className="bg-gray-200 backdrop-blur-sm text-black text-xs font-mono px-2 py-1 md:px-3 md:py-1 rounded-full">
                    {country.cca3}
                  </span>
                )}
                {country.cioc && (
                  <span className="bg-gray-200 backdrop-blur-sm text-black text-xs font-semibold px-2 py-1 md:px-3 md:py-1 rounded-full">
                    {country.cioc}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Like Button */}
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 md:top-6 md:right-6 bg-gray-200 backdrop-blur-sm rounded-full p-2 md:p-3 transition-all hover:bg-gray-300 hover:scale-110 order-3"
          >
            <Heart 
              className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-black'
              }`} 
            />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        {country.area && (
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl md:rounded-2xl p-3 md:p-6 text-white shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <Globe className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 opacity-80" />
            <p className="text-xs md:text-sm opacity-90">Area</p>
            <p className="text-lg md:text-2xl font-bold">{formatNumber(country.area)} km²</p>
          </div>
        )}
        
        {country.population && (
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl md:rounded-2xl p-3 md:p-6 text-white shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <Users className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 opacity-80" />
            <p className="text-xs md:text-sm opacity-90">Population</p>
            <p className="text-lg md:text-2xl font-bold">{(country.population / 1000000).toFixed(1)}M</p>
          </div>
        )}
        
        {country.area && country.population && (
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl md:rounded-2xl p-3 md:p-6 text-white shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 opacity-80" />
            <p className="text-xs md:text-sm opacity-90">Density</p>
            <p className="text-lg md:text-2xl font-bold">{Math.round(country.population / country.area)}/km²</p>
          </div>
        )}
        
        {country.borders && (
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl md:rounded-2xl p-3 md:p-6 text-white shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <Flag className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 opacity-80" />
            <p className="text-xs md:text-sm opacity-90">Borders</p>
            <p className="text-lg md:text-2xl font-bold">
              {country.borders.length > 0 ? country.borders.length : 'None'}
            </p>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="bg-blue-100 p-2 md:p-3 rounded-lg md:rounded-xl">
              <Languages className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Languages & Culture</h3>
          </div>
          <div className="space-y-2 md:space-y-3">
            {country.languages && Object.entries(country.languages).map(([code, name], index) => (
              <div key={code} className={`flex justify-between items-center p-2 md:p-3 rounded-lg ${
                index === 0 ? 'bg-blue-50' : 'bg-gray-50'
              }`}>
                <div>
                  <span className="font-semibold text-sm md:text-base">
                    {name}
                  </span>
                  <span className="text-xs text-gray-500 ml-1 md:ml-2">({code})</span>
                </div>
                {index === 0 && (
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-full">
                    Primary
                  </span>
                )}
              </div>
            ))}
            {country.currencies && (
              <div className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-sm md:text-base">Currency</span>
                <span className="text-gray-600 text-sm md:text-base">{formatObjectValues(country.currencies)}</span>
              </div>
            )}
            {country.demonyms?.eng && (
              <div className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-sm md:text-base">Demonym</span>
                <span className="text-gray-600 text-sm md:text-base">{country.demonyms.eng.m}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="bg-purple-100 p-2 md:p-3 rounded-lg md:rounded-xl">
              <Map className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Geography</h3>
          </div>
          <div className="space-y-2 md:space-y-3">
            {country.continents && (
              <div className="flex justify-between items-center p-2 md:p-3 bg-purple-50 rounded-lg">
                <span className="font-semibold text-sm md:text-base">Continent</span>
                <span className="text-gray-600 text-sm md:text-base">{formatList(country.continents)}</span>
              </div>
            )}
            {country.latlng && (
              <div className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-sm md:text-base">Coordinates</span>
                <span className="text-gray-600 font-mono text-xs md:text-sm">
                  {country.latlng[0]?.toFixed(2)}°, {country.latlng[1]?.toFixed(2)}°
                </span>
              </div>
            )}
            {country.landlocked !== undefined && (
              <div className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-sm md:text-base">Landlocked</span>
                <span className={`font-semibold text-sm md:text-base ${country.landlocked ? 'text-orange-600' : 'text-green-600'}`}>
                  {country.landlocked ? 'Yes' : 'No'}
                </span>
              </div>
            )}
            {country.timezones && country.timezones[0] && (
              <div className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-sm md:text-base">Timezone</span>
                <span className="text-gray-600 text-sm md:text-base">{country.timezones[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Additional Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div>
            <h4 className="font-bold text-base md:text-lg text-gray-700 mb-2 md:mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              International
            </h4>
            <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
              {country.unMember !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-600">UN Member</span>
                  <span className={`font-semibold ${country.unMember ? 'text-green-600' : 'text-gray-600'}`}>
                    {country.unMember ? 'Yes' : 'No'}
                  </span>
                </div>
              )}
              {country.fifa && (
                <div className="flex justify-between">
                  <span className="text-gray-600">FIFA Code</span>
                  <span className="font-semibold text-gray-800">{country.fifa}</span>
                </div>
              )}
              {country.tld && (
                <div className="flex justify-between">
                  <span className="text-gray-600">TLD</span>
                  <span className="font-semibold text-gray-800">{formatList(country.tld)}</span>
                </div>
              )}
              {country.idd?.root && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Dialing Code</span>
                  <span className="font-semibold text-gray-800">
                    {country.idd.root}{country.idd.suffixes?.[0]}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-base md:text-lg text-gray-700 mb-2 md:mb-3 flex items-center gap-2">
              <Navigation className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              Local Information
            </h4>
            <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
              {country.car?.side && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Driving Side</span>
                  <span className="font-semibold text-gray-800 capitalize">{country.car.side}</span>
                </div>
              )}
              {country.startOfWeek && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Week Starts</span>
                  <span className="font-semibold text-gray-800 capitalize">{country.startOfWeek}</span>
                </div>
              )}
              {country.timezones && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Timezones</span>
                  <span className="font-semibold text-gray-800">{country.timezones.length}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-base md:text-lg text-gray-700 mb-2 md:mb-3 flex items-center gap-2">
              <Map className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
              Maps & Links
            </h4>
            <div className="space-y-1 md:space-y-2">
              {country.maps?.googleMaps && (
                <a 
                  href={country.maps.googleMaps} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-xs md:text-sm font-medium"
                >
                  <span>🗺️</span>
                  Google Maps
                </a>
              )}
              {country.maps?.openStreetMaps && (
                <a 
                  href={country.maps.openStreetMaps} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-xs md:text-sm font-medium"
                >
                  <span>🗺️</span>
                  OpenStreetMap
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {(country.continents || country.landlocked !== undefined || country.fifa || country.tld) && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
            Interesting Facts
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
            {country.continents && (
              <div className="bg-blue-100 p-2 md:p-4 rounded-lg md:rounded-xl text-center">
                <p className="text-xs md:text-xs text-blue-700 mb-1">Continent</p>
                <p className="font-bold text-sm md:text-base text-blue-900">{formatList(country.continents)}</p>
              </div>
            )}
            {country.landlocked !== undefined && (
              <div className="bg-green-100 p-2 md:p-4 rounded-lg md:rounded-xl text-center">
                <p className="text-xs md:text-xs text-green-700 mb-1">Landlocked</p>
                <p className="font-bold text-sm md:text-base text-green-900">{country.landlocked ? 'Yes' : 'No'}</p>
              </div>
            )}
            {country.fifa && (
              <div className="bg-purple-100 p-2 md:p-4 rounded-lg md:rounded-xl text-center">
                <p className="text-xs md:text-xs text-purple-700 mb-1">FIFA</p>
                <p className="font-bold text-sm md:text-base text-purple-900">{country.fifa}</p>
              </div>
            )}
            {country.tld && (
              <div className="bg-yellow-100 p-2 md:p-4 rounded-lg md:rounded-xl text-center">
                <p className="text-xs md:text-xs text-yellow-700 mb-1">Domain</p>
                <p className="font-bold text-sm md:text-base text-yellow-900">{formatList(country.tld)}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCard;