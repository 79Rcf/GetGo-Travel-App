import React, { useState, useEffect, useRef } from 'react';

const Header = ({ onSearch, currentCountry = '' }) => {
  const [searchInput, setSearchInput] = useState(currentCountry);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const inputRef = useRef(null);

    useEffect(() => {  
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current && 
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = async (query) => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&type=country&format=json&apiKey=${apiKey}`
      );
      
      if (response.ok) {
        const data = await response.json();
        
        const countrySuggestions = data.results
          ?.filter(result => result.country && result.country_code)
          .map(result => ({
            name: result.country,
            code: result.country_code,
            flag: `https://flagcdn.com/w40/${result.country_code.toLowerCase()}.png`,
            formatted: `${result.country} (${result.country_code})`
          }))
          .filter((item, index, self) => 
            index === self.findIndex(t => t.code === item.code)
          )
          .slice(0, 5); 
        
        setSuggestions(countrySuggestions || []);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion.name);
    onSearch(suggestion.name);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <span className="text-2xl">✈️</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">GoTravel Explorer</h1>
              <p className="text-blue-100 text-sm">Your personal travel assistant</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 relative">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onFocus={() => setShowSuggestions(suggestions.length > 0)}
                  placeholder="Search for a country (e.g., France, Japan)..."
                  className="w-full pl-12 pr-10 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow"
                />
                
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <span className="text-gray-400">🔍</span>
                </div>

                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={!searchInput.trim()}
                className={`absolute right-0 top-0 h-full px-4 rounded-r-lg font-semibold transition-colors ${
                  searchInput.trim() 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Search
              </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
              <div 
                ref={suggestionsRef}
                className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto"
              >
                <div className="p-2">
                  <p className="text-xs text-gray-500 px-2 py-1">Country Suggestions</p>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion.code}-${index}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded flex items-center gap-3 transition-colors"
                    >
                      <img 
                        src={suggestion.flag} 
                        alt={`${suggestion.code} flag`}
                        className="w-6 h-4 object-cover rounded"
                      />
                      <span className="text-gray-800">{suggestion.formatted}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              </div>
            )}

            {showSuggestions && !isLoading && suggestions.length === 0 && searchInput.length >= 2 && (
              <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
                <p className="text-gray-600">No countries found for "{searchInput}"</p>
                <p className="text-sm text-gray-500 mt-1">Try a different search term</p>
              </div>
            )}
          </div>


          <div className="hidden lg:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-blue-200">Currently viewing</p>
              <p className="font-semibold">
                {currentCountry || 'No country selected'}
              </p>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">GT</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <p className="text-blue-200 text-sm mr-2">Popular:</p>
          {['France', 'Japan', 'USA', 'Italy', 'Australia', 'Brazil'].map((country) => (
            <button
              key={country}
              onClick={() => {
                setSearchInput(country);
                onSearch(country);
              }}
              className="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-sm transition-all hover:scale-105"
            >
              {country}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;