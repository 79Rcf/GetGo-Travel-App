import React, { useState, useEffect, useRef } from "react";

const Header = ({ onSearch, currentCountry = "" }) => {
  const [searchInput, setSearchInput] = useState(currentCountry);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const inputRef = useRef(null);


  useEffect(() => {
    console.log('HTML class list:', document.documentElement.className);
    console.log('LocalStorage theme:', localStorage.getItem('theme'));
    console.log('Has .dark class?', document.documentElement.classList.contains('dark'));
  }, []);

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          query
        )}&type=country&format=json&apiKey=${apiKey}`
      );

      if (response.ok) {
        const data = await response.json();

        const countrySuggestions = data.results
          ?.filter((result) => result.country && result.country_code)
          .map((result) => ({
            name: result.country,
            code: result.country_code,
            flag: `https://flagcdn.com/w40/${result.country_code.toLowerCase()}.png`,
            formatted: `${result.country} (${result.country_code})`,
          }))
          .filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.code === item.code)
          )
          .slice(0, 5);

        setSuggestions(countrySuggestions || []);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
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
    setSearchInput("");
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <header 
      className="bg-white border-b border-gray-100  transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">

          <div className="flex items-center gap-3">
            <div>
              <div className="relative inline-block">
                <div className="relative inline-block"></div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-xl font-bold text-gray-900 dark:text-black">
                GetGo Travel
              </h1>
              <p className="text-gray-600 text-sm dark:text-gray-400">
                Discover the world naturally
              </p>
            </div>
          </div>

          <div className="w-full md:w-2/5 lg:w-1/3 relative">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative bg-white rounded-lg border border-gray-300 
                           dark:bg-gray-600  dark:shadow-none">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onFocus={() => setShowSuggestions(suggestions.length > 0)}
                  placeholder="Search destination..."

                  className="w-full pl-12 pr-10 py-3 rounded-lg focus:outline-none focus:ring-1 
                           text-gray-900 dark:text-gray-100 bg-transparent
                           focus:ring-blue-400 dark:focus:ring-blue-400"
                />

                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 22s8-4.438 8-11a8 8 0 10-16 0c0 6.562 8 11 8 11z"
                    />
                  </svg>
                </div>

                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                )}

                <button
                  type="submit"
                  disabled={!searchInput.trim()}
                  className={`absolute right-0 top-0 h-full px-4 rounded-r-lg font-medium transition-colors 
                    ${

                      searchInput.trim()
                        ? " text-white"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                    }`}
                >
                  Go
                </button>
              </div>
            </form>

            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-50 w-full mt-1 rounded-lg shadow-xl border max-h-80 overflow-y-auto
                           bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="p-2">
                  <div className="flex items-center gap-2 px-2 py-1 mb-1">
                    <span className="text-blue-500 text-sm dark:text-blue-400">📍</span> 
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Suggested destinations
                    </p>
                  </div>
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.code}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-3 py-2 rounded flex items-center gap-3 transition-colors 
                                 // Subtle hover color matching the accent scheme
                                 hover:bg-blue-50 dark:hover:bg-gray-700 
                                 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <img
                        src={suggestion.flag}
                        alt={`${suggestion.code} flag`}
                        className="w-6 h-4 object-cover rounded"
                      />
                      <div>
                        <span className="text-gray-900 dark:text-gray-100">{suggestion.name}</span>
                        <span className="text-gray-500 text-sm ml-2 dark:text-gray-400">
                          ({suggestion.code})
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                <div className="animate-pulse text-gray-500 dark:text-gray-400 relative left-[-25px]">
                  Searching...
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4"> 
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right pr-4 border-r border-gray-300 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-900">Currently exploring</p>
                <p className="font-medium text-gray-900 dark:text-gray-9000">{currentCountry || "Worldwide"}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
                <span className="text-blue-600 text-sm dark:text-blue-400">👤</span>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-6 flex justify-center"></div>
      </div>
    </header>
  );
};

export default Header;