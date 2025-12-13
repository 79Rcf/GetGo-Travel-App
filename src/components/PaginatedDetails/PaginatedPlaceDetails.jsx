import React, { useState, useMemo } from 'react';

const PaginatedPlaceDetails = ({ places, placeDetails = [], initialVisible = 6, increment = 3 }) => {
  const [visibleCount, setVisibleCount] = useState(initialVisible);

  // Filtering function - moved INSIDE the component
  const filterLowQualityPlaces = (placesToFilter) => {
    if (!placesToFilter) return [];
    
    return placesToFilter.filter(place => {
      const props = place.properties;
      
      // Skip if no properties
      if (!props) return false;
      
      // Quality checks
      const hasName = props.name && props.name.trim().length > 2;
      const hasCategory = props.categories && props.categories.length > 0;
      const hasAddress = props.formatted || props.address_line2;
      const notGeneric = !props.name?.match(/^(building|house|shop|unknown|home|road|street|way)$/i);
      
      // Score system: keep if 3+ checks pass
      const score = [hasName, hasCategory, hasAddress, notGeneric].filter(Boolean).length;
      return score >= 3;
    });
  };

  // Use useMemo to cache filtered results (performance optimization)
  const filteredPlaces = useMemo(() => 
    filterLowQualityPlaces(places), 
    [places]
  );

  if (!filteredPlaces || filteredPlaces.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No quality attractions found for this location.
        <p className="text-xs text-gray-400 mt-2">
          Try adjusting your search or check another area.
        </p>
      </div>
    );
  }

  const visiblePlaces = filteredPlaces.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPlaces.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + increment, filteredPlaces.length));
  };

  const showLess = () => {
    setVisibleCount(initialVisible);
  };

  // Create a mapping from place IDs to their details for easy lookup
  const detailsMap = {};
  if (placeDetails && Array.isArray(placeDetails)) {
    placeDetails.forEach(detail => {
      if (detail && detail.place_id) {
        detailsMap[detail.place_id] = detail;
      }
    });
  }

  return (
    <div>
      {/* Quality filter indicator */}
      <div className="mb-4 text-sm text-gray-600">
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
          Filtered for quality
        </span>
        <span className="ml-2">
          Showing {filteredPlaces.length} of {places?.length || 0} total results
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePlaces.map((place, index) => {
          const properties = place.properties;
          // Get details by place_id instead of index (more reliable)
          const details = properties.place_id ? detailsMap[properties.place_id] : null;

          return (
            <div 
              key={properties.place_id || index} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              {/* Place Image */}
              <div className="h-40 overflow-hidden bg-gray-100">
                {details?.image ? (
                  <img 
                    src={details.image} 
                    alt={properties.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><span class="text-4xl">🏞️</span></div>';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-4xl">🏞️</span>
                  </div>
                )}
              </div>

              {/* Place Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-800 truncate">
                  {properties.name || 'Unnamed Place'}
                </h3>
                
                {/* Categories */}
                {properties.categories && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {properties.categories.slice(0, 2).map((category, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {category.split('.').pop()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Address */}
                {properties.formatted && (
                  <p className="text-sm text-gray-600 mt-2 truncate" title={properties.formatted}>
                    📍 {properties.formatted}
                  </p>
                )}

                {/* Distance */}
                {properties.distance && (
                  <p className="text-xs text-gray-500 mt-1">
                    {properties.distance.toFixed(0)} meters away
                  </p>
                )}

                {/* Rating */}
                {details?.rating && (
                  <div className="mt-2 flex items-center">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1 text-sm font-medium">
                      {details.rating.toFixed(1)}
                    </span>
                    <span className="ml-1 text-xs text-gray-500">
                      ({details.reviews || 0} reviews)
                    </span>
                  </div>
                )}
                
                {/* Quality Score (for debugging) */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-2 text-xs text-gray-400">
                    Quality check: {[
                      properties.name?.trim().length > 2 ? '✅ Name' : '❌ Name',
                      properties.categories?.length > 0 ? '✅ Category' : '❌ Category',
                      (properties.formatted || properties.address_line2) ? '✅ Address' : '❌ Address',
                      !properties.name?.match(/^(building|house|shop|unknown|home|road|street|way)$/i) ? '✅ Not generic' : '❌ Generic'
                    ].join(' | ')}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing {visiblePlaces.length} of {filteredPlaces.length} quality attractions
        </div>
        
        <div className="flex gap-2">
          {/* Show Less button */}
          {visibleCount > initialVisible && (
            <button
              onClick={showLess}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Show Less
            </button>
          )}

          {/* Load More button */}
          {hasMore && (
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Load {Math.min(increment, filteredPlaces.length - visibleCount)} More
              <span className="text-lg">↓</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile hint */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          {hasMore ? 'Scroll down or tap "Load More" to see more quality attractions' : 'All quality attractions displayed'}
        </p>
      </div>
    </div>
  );
};

export default PaginatedPlaceDetails;