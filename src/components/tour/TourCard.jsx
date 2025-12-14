import React from 'react';

const TourCard = ({ countryName = 'Destination', tours = [], isLoading = false }) => {
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading tours for {countryName}...</p>
        </div>
      </div>
    );
  }
  
  if (!tours || tours.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-8 text-gray-500">
          No tour data available for {countryName}.
          <p className="text-xs text-gray-400 mt-2">
            Try searching for another destination.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Tours & Activities</h2>
          <p className="text-gray-600 mt-1">Curated experiences in {countryName}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
            Popular in {countryName}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tours.map((tour) => (
          <div 
            key={tour.id} 
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-48 overflow-hidden">
              {tour.pexelsImage ? (
                <div className="relative h-full">
                  <img 
                    src={tour.pexelsImage.url} 
                    alt={tour.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <a 
                      href={tour.pexelsImage.photographerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-xs hover:underline"
                    >
                      Photo by {tour.pexelsImage.photographer}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                  <div className="text-4xl">
                    {tour.category.includes('Food') ? '🍲' : 
                     tour.category.includes('Nature') ? '⛰️' : 
                     tour.category.includes('Historical') ? '🏰' : '🏛️'}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div>
                      <h3 className="font-bold text-lg">{tour.title}</h3>
                      <span className="text-xs text-gray-500">{tour.category}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{tour.description}</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-xs text-gray-500">Duration</div>
                  <div className="font-semibold">{tour.duration}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">Price</div>
                  <div className="font-bold text-lg text-blue-600">${tour.price}</div>
                  <div className="text-xs text-gray-500">per person</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`text-lg ${i < Math.floor(tour.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="font-semibold ml-1">{tour.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({tour.reviewCount})</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  View Details
                </button>
                <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg font-medium transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="text-blue-600"></div>
          <div>
            <h4 className="font-semibold text-blue-800">Tour Images Integration</h4>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;