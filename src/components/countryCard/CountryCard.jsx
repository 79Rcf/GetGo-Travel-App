import React, { useState } from 'react';
import { MapPin, Users, Globe, TrendingUp, Award, Languages, Map, Flag, Heart, Navigation, Phone, Clock } from 'lucide-react';

const CountryCard = ({ country }) => {
  const [isLiked, setIsLiked] = useState(false);

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
  const formatObjectValues = (obj) => obj ? Object.values(obj).join(', ') : 'N/A';

  return (
    <div className="space-y-6">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
      <div 
  className="absolute inset-0 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
        
        <div className="relative h-96 flex items-center justify-between p-8">
          <div className="flex items-center gap-8">
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <img 
                src={country.flags?.png} 
                alt={`Flag of ${country.name?.common}`}
                className="w-52 h-auto shadow-2xl rounded-2xl border-4 border-white/50"
              />
              {country.coatOfArms?.png && (
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white rounded-full p-2 shadow-xl">
                  <img 
                    src={country.coatOfArms.png} 
                    alt="Coat of Arms"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
            
            {/* Country Info */}
            <div className="text-white">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                  {country.region}
                </span>
                {country.subregion && (
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                    {country.subregion}
                  </span>
                )}
                {country.independent !== undefined && (
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 ${
                    country.independent 
                      ? 'bg-green-500/80 backdrop-blur-sm' 
                      : 'bg-gray-500/80 backdrop-blur-sm'
                  }`}>
                    <Award className="w-4 h-4" />
                    {country.independent ? 'Independent' : 'Dependent'}
                  </span>
                )}
              </div>
              
              <h1 className="text-6xl font-bold mb-2">{country.name?.common}</h1>
              <h2 className="text-2xl text-white/80 mb-4">{country.name?.official}</h2>
              
              <div className="flex items-center gap-6 text-lg">
                {country.capital && country.capital[0] && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{formatList(country.capital)}</span>
                  </div>
                )}
                {country.population && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{formatNumber(country.population)}</span>
                  </div>
                )}
              </div>

              {/* Country Codes */}
              <div className="flex items-center gap-2 mt-4">
                {country.cca2 && (
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-mono px-3 py-1 rounded-full">
                    {country.cca2}
                  </span>
                )}
                {country.cca3 && (
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-mono px-3 py-1 rounded-full">
                    {country.cca3}
                  </span>
                )}
                {country.cioc && (
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {country.cioc}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Like Button */}
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all hover:bg-white/30 hover:scale-110"
          >
            <Heart 
              className={`w-6 h-6 transition-colors ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-white'
              }`} 
            />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {country.area && (
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <Globe className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-sm opacity-90">Area</p>
            <p className="text-2xl font-bold">{formatNumber(country.area)} km²</p>
          </div>
        )}
        
        {country.population && (
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <Users className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-sm opacity-90">Population</p>
            <p className="text-2xl font-bold">{(country.population / 1000000).toFixed(1)}M</p>
          </div>
        )}
        
        {country.area && country.population && (
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <TrendingUp className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-sm opacity-90">Density</p>
            <p className="text-2xl font-bold">{Math.round(country.population / country.area)}/km²</p>
          </div>
        )}
        
        {country.borders && (
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <Flag className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-sm opacity-90">Borders</p>
            <p className="text-2xl font-bold">
              {country.borders.length > 0 ? country.borders.length : 'None'}
            </p>
          </div>
        )}
      </div>

      {/* Info Cards Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Languages & Culture Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Languages className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Languages & Culture</h3>
          </div>
          <div className="space-y-3">
            {country.languages && Object.entries(country.languages).map(([code, name], index) => (
              <div key={code} className={`flex justify-between items-center p-3 rounded-lg ${
                index === 0 ? 'bg-blue-50' : 'bg-gray-50'
              }`}>
                <div>
                  <span className="font-semibold">{name}</span>
                  <span className="text-xs text-gray-500 ml-2">({code})</span>
                </div>
                {index === 0 && (
                  <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
                    Primary
                  </span>
                )}
              </div>
            ))}
            {country.currencies && (
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">Currency</span>
                <span className="text-gray-600">{formatObjectValues(country.currencies)}</span>
              </div>
            )}
            {country.demonyms?.eng && (
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">Demonym</span>
                <span className="text-gray-600">{country.demonyms.eng.m}</span>
              </div>
            )}
          </div>
        </div>

        {/* Geography Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Map className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Geography</h3>
          </div>
          <div className="space-y-3">
            {country.continents && (
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="font-semibold">Continent</span>
                <span className="text-gray-600">{formatList(country.continents)}</span>
              </div>
            )}
            {country.latlng && (
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">Coordinates</span>
                <span className="text-gray-600 font-mono text-sm">
                  {country.latlng[0]?.toFixed(2)}°, {country.latlng[1]?.toFixed(2)}°
                </span>
              </div>
            )}
            {country.landlocked !== undefined && (
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">Landlocked</span>
                <span className={`font-semibold ${country.landlocked ? 'text-orange-600' : 'text-green-600'}`}>
                  {country.landlocked ? 'Yes' : 'No'}
                </span>
              </div>
            )}
            {country.timezones && country.timezones[0] && (
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">Timezone</span>
                <span className="text-gray-600">{country.timezones[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Information Grid */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Additional Information</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* International */}
          <div>
            <h4 className="font-bold text-lg text-gray-700 mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              International
            </h4>
            <div className="space-y-2 text-sm">
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

          {/* Local Info */}
          <div>
            <h4 className="font-bold text-lg text-gray-700 mb-3 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-purple-600" />
              Local Information
            </h4>
            <div className="space-y-2 text-sm">
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

          {/* Maps & Links */}
          <div>
            <h4 className="font-bold text-lg text-gray-700 mb-3 flex items-center gap-2">
              <Map className="w-5 h-5 text-orange-600" />
              Maps & Links
            </h4>
            <div className="space-y-2">
              {country.maps?.googleMaps && (
                <a 
                  href={country.maps.googleMaps} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
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
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <span>🗺️</span>
                  OpenStreetMap
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Interesting Facts */}
      {(country.continents || country.landlocked !== undefined || country.fifa || country.tld) && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-600" />
            Interesting Facts
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {country.continents && (
              <div className="bg-blue-100 p-4 rounded-xl text-center">
                <p className="text-xs text-blue-700 mb-1">Continent</p>
                <p className="font-bold text-blue-900">{formatList(country.continents)}</p>
              </div>
            )}
            {country.landlocked !== undefined && (
              <div className="bg-green-100 p-4 rounded-xl text-center">
                <p className="text-xs text-green-700 mb-1">Landlocked</p>
                <p className="font-bold text-green-900">{country.landlocked ? 'Yes' : 'No'}</p>
              </div>
            )}
            {country.fifa && (
              <div className="bg-purple-100 p-4 rounded-xl text-center">
                <p className="text-xs text-purple-700 mb-1">FIFA</p>
                <p className="font-bold text-purple-900">{country.fifa}</p>
              </div>
            )}
            {country.tld && (
              <div className="bg-yellow-100 p-4 rounded-xl text-center">
                <p className="text-xs text-yellow-700 mb-1">Domain</p>
                <p className="font-bold text-yellow-900">{formatList(country.tld)}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCard;