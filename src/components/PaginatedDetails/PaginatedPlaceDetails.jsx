import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, Star, Heart, Navigation, TrendingUp, Award } from 'lucide-react';

const PaginatedPlaceDetails = ({ places, placeDetails = [], initialVisible = 6, increment = 3 }) => {
  const [visibleCount, setVisibleCount] = useState(initialVisible);
  const [liked, setLiked] = useState({});

  const toggleLike = (placeId) => {
    setLiked(prev => ({ ...prev, [placeId]: !prev[placeId] }));
  };

  const getRandomImage = (categories = [], placeId, index) => {
    const baseUrl = 'https://picsum.photos';
    const seed = placeId || `place-${index}`;
    
    let imageId = Math.abs(seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 1000;

    if (categories && categories.length > 0) {
      const category = categories[0].toLowerCase();
      if (category.includes('mountain') || category.includes('volcano')) {
        imageId = 100 + (imageId % 100);
      } else if (category.includes('park') || category.includes('garden')) {
        imageId = 200 + (imageId % 100); 
      } else if (category.includes('beach') || category.includes('coast')) {
        imageId = 300 + (imageId % 100); 
      } else if (category.includes('museum') || category.includes('cultural')) {
        imageId = 400 + (imageId % 100); 
      } else if (category.includes('historical') || category.includes('palace')) {
        imageId = 500 + (imageId % 100); 
      }
    }
    
    return `${baseUrl}/400/300?random=${imageId}`;
  };

  const filterLowQualityPlaces = (placesToFilter) => {
    if (!placesToFilter) {
      console.log('No places to filter');
      return [];
    }
    
    const filtered = placesToFilter.filter(place => {
      const props = place.properties;
      
      if (!props) {
        console.log('   No properties');
        return false;
      }
      
      const hasName = props.name && props.name.trim().length > 2;
      const hasCategory = props.categories && props.categories.length > 0;
      const hasAddress = props.formatted || props.address_line2;
      const notGeneric = !props.name?.match(/^(building|house|shop|unknown|home|road|street|way)$/i);
      
      const score = [hasName, hasCategory, hasAddress, notGeneric].filter(Boolean).length;
      const passes = score >= 3;
      
      return passes;
    });
    
    return filtered;
  };

  const filteredPlaces = useMemo(() => {
    return filterLowQualityPlaces(places);
  }, [places]);

  useEffect(() => {
  }, [filteredPlaces]);

  if (!filteredPlaces || filteredPlaces.length === 0) {
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

  const getPlaceEmoji = (categories = []) => {
    if (!categories || categories.length === 0) return '🏞️';
    
    const category = categories[0].toLowerCase();
    
    if (category.includes('mountain') || category.includes('volcano')) return '⛰️';
    if (category.includes('park') || category.includes('garden')) return '🌳';
    if (category.includes('beach') || category.includes('coast')) return '🏖️';
    if (category.includes('museum') || category.includes('cultural')) return '🏛️';
    if (category.includes('historical') || category.includes('palace')) return '🏰';
    if (category.includes('wildlife') || category.includes('animals')) return '🦁';
    if (category.includes('lake') || category.includes('water')) return '🌊';
    if (category.includes('shopping') || category.includes('market')) return '🛍️';
    if (category.includes('restaurant') || category.includes('food')) return '🍽️';
    
    return '🏞️';
  };

  return (
    <div>
      {/* Header with filter info */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Award className="w-3 h-3" />
            Quality Filtered
          </span>
          <span>
            {filteredPlaces.length} of {places?.length || 0} attractions
          </span>
        </div>
      </div>

      {/* Cards Grid - New Compact Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePlaces.map((place, index) => {
          const properties = place.properties;
          const details = properties.place_id ? detailsMap[properties.place_id] : null;
          const randomImageUrl = getRandomImage(properties.categories, properties.place_id, index);
          const imageUrl = details?.image || randomImageUrl;
          const placeId = properties.place_id || index;

          // Generate rating if not available
          const rating = details?.rating || (Math.random() * 2 + 3).toFixed(1);
          const reviews = details?.reviews || Math.floor(Math.random() * 1000);

          return (
            <div 
              key={placeId}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="relative h-96 overflow-hidden">
                  {/* Image */}
                  <img 
                    src={imageUrl} 
                    alt={properties.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='60'%3E${getPlaceEmoji(properties.categories)}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  
                  {/* Rank Badge - Top 3 get special styling */}
                  {index < 3 && (
                    <div className="absolute top-4 left-4">
                      <div className={`
                        ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 
                          index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' : 
                          'bg-gradient-to-br from-orange-400 to-orange-600'}
                        text-white font-bold w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg
                      `}>
                        #{index + 1}
                      </div>
                    </div>
                  )}
                  
                  {/* Like Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(placeId);
                    }}
                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all hover:bg-white/30 hover:scale-110"
                  >
                    <Heart 
                      className={`w-5 h-5 transition-colors ${
                        liked[placeId] 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-white'
                      }`} 
                    />
                  </button>

                  {/* Category Badge */}
                  {properties.categories && properties.categories.length > 0 && (
                    <div className="absolute top-4 left-4" style={{ marginTop: index < 3 ? '48px' : '0' }}>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium capitalize">
                        {properties.categories[0].split('.').pop()}
                      </span>
                    </div>
                  )}

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    {/* Title and Distance Row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 pr-3">
                        <h3 className="text-2xl font-bold mb-1 leading-tight">
                          {properties.name || 'Unnamed Place'}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-white/90 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="line-clamp-1">
                            {properties.formatted || properties.address_line2 || 'Location'}
                          </span>
                        </div>
                      </div>
                      {properties.distance && (
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                            <Navigation className="w-3 h-3" />
                            <span className="text-xs font-semibold">
                              {(properties.distance / 1000).toFixed(1)}km
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Info Row */}
                    <div className="flex items-center gap-4 text-sm flex-wrap">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{rating}</span>
                        <span className="text-white/70">({reviews})</span>
                      </div>
                      {properties.categories && properties.categories.length > 1 && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-white/90 text-xs">
                            {properties.categories.length} categories
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Debug Info - Development only */}
                    {process.env.NODE_ENV === 'development' && (
                      <div className="mt-2 pt-2 border-t border-white/20">
                        <div className="text-xs text-white/60 space-y-1">
                          <div>ID: {properties.place_id || 'N/A'}</div>
                          <div>Details: {details ? '✓' : '✗'} | Image: {imageUrl ? '✓' : '✗'}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More / Show Less Controls */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{visiblePlaces.length}</span> of <span className="font-semibold">{filteredPlaces.length}</span> quality attractions
        </div>
        
        <div className="flex gap-2">
          {visibleCount > initialVisible && (
            <button
              onClick={showLess}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Show Less
            </button>
          )}

          {hasMore && (
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Load {Math.min(increment, filteredPlaces.length - visibleCount)} More
              <span className="text-lg">↓</span>
            </button>
          )}
        </div>
      </div>

      {/* Status Message */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          {hasMore ? 'Scroll down or tap "Load More" to discover more attractions' : '🎉 All quality attractions displayed'}
        </p>
      </div>
    </div>
  );
};

export default PaginatedPlaceDetails;