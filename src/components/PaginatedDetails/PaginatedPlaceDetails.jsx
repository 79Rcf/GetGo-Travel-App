import React, { useState, useMemo, useEffect } from 'react';

const PaginatedPlaceDetails = ({ places, placeDetails = [], initialVisible = 6, increment = 3 }) => {
  const [visibleCount, setVisibleCount] = useState(initialVisible);

  // Debug logging
  useEffect(() => {
    console.log('=== PAGINATED PLACE DETAILS DEBUG ===');
    console.log('Places received:', places);
    console.log('Places length:', places?.length);
    console.log('Place details received:', placeDetails);
    console.log('Place details length:', placeDetails?.length);
    
    if (places && places.length > 0) {
      console.log('First place:', places[0]);
      console.log('First place properties:', places[0].properties);
    }
  }, [places, placeDetails]);

  const filterLowQualityPlaces = (placesToFilter) => {
    console.log('=== FILTER DEBUG ===');
    console.log('Input places to filter:', placesToFilter?.length);
    
    if (!placesToFilter) {
      console.log('No places to filter');
      return [];
    }
    
    const filtered = placesToFilter.filter(place => {
      const props = place.properties;
      console.log('Checking place:', props?.name);
      
      if (!props) {
        console.log('  ❌ No properties');
        return false;
      }
      
      const hasName = props.name && props.name.trim().length > 2;
      const hasCategory = props.categories && props.categories.length > 0;
      const hasAddress = props.formatted || props.address_line2;
      const notGeneric = !props.name?.match(/^(building|house|shop|unknown|home|road|street|way)$/i);

      console.log('  Name check:', hasName, props.name);
      console.log('  Category check:', hasCategory, props.categories);
      console.log('  Address check:', hasAddress, props.formatted);
      console.log('  Not generic check:', notGeneric);
      
      const score = [hasName, hasCategory, hasAddress, notGeneric].filter(Boolean).length;
      console.log('  Score:', score, '/ 4');
      
      const passes = score >= 3;
      console.log('  Passes filter?', passes);
      
      return passes;
    });
    
    console.log('Filtered result:', filtered.length, 'out of', placesToFilter.length);
    console.log('Filtered places:', filtered.map(p => p.properties.name));
    
    return filtered;
  };

  const filteredPlaces = useMemo(() => {
    console.log('useMemo running with places:', places?.length);
    return filterLowQualityPlaces(places);
  }, [places]);

  // Debug: Log filtered places
  useEffect(() => {
    console.log('Filtered places result:', filteredPlaces?.length);
  }, [filteredPlaces]);

  if (!filteredPlaces || filteredPlaces.length === 0) {
    console.log('Rendering empty state - no filtered places');
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-yellow-800">DEBUG INFO:</h3>
          <p className="text-sm">Original places: {places?.length || 0}</p>
          <p className="text-sm">Filtered places: {filteredPlaces?.length || 0}</p>
          <p className="text-sm">Place details: {placeDetails?.length || 0}</p>
        </div>
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

  const detailsMap = {};
  if (placeDetails && Array.isArray(placeDetails)) {
    placeDetails.forEach(detail => {
      if (detail && detail.place_id) {
        detailsMap[detail.place_id] = detail;
      }
    });
  }

  console.log('Rendering with visible places:', visiblePlaces.length);
  console.log('Details map size:', Object.keys(detailsMap).length);

  return (
    <div>
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
          const details = properties.place_id ? detailsMap[properties.place_id] : null;

          console.log(`Rendering place ${index}:`, properties.name);
          console.log('  Place ID:', properties.place_id);
          console.log('  Found details:', !!details);

          return (
            <div 
              key={properties.place_id || index} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="h-40 overflow-hidden bg-gray-100">
                {details?.image ? (
                  <img 
                    src={details.image} 
                    alt={properties.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log('Image failed to load for:', properties.name);
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><span class="text-4xl">🏞️</span></div>';
                    }}
                    onLoad={() => console.log('Image loaded for:', properties.name)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-4xl">🏞️</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-800 truncate">
                  {properties.name || 'Unnamed Place'}
                </h3>

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

                {properties.formatted && (
                  <p className="text-sm text-gray-600 mt-2 truncate" title={properties.formatted}>
                    📍 {properties.formatted}
                  </p>
                )}

                {properties.distance && (
                  <p className="text-xs text-gray-500 mt-1">
                    {properties.distance.toFixed(0)} meters away
                  </p>
                )}

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
                
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-2 text-xs text-gray-400">
                    <div className="font-medium">Debug Info:</div>
                    <div>Place ID: {properties.place_id}</div>
                    <div>Has details: {details ? 'Yes' : 'No'}</div>
                    <div>Image URL: {details?.image ? 'Yes' : 'No'}</div>
                    <div>Rating: {details?.rating || 'N/A'}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing {visiblePlaces.length} of {filteredPlaces.length} quality attractions
        </div>
        
        <div className="flex gap-2">
          {visibleCount > initialVisible && (
            <button
              onClick={showLess}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Show Less
            </button>
          )}

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

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          {hasMore ? 'Scroll down or tap "Load More" to see more quality attractions' : 'All quality attractions displayed'}
        </p>
      </div>
    </div>
  );
};

export default PaginatedPlaceDetails;