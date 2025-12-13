import React, { useState } from 'react';

const PlaceDetails = ({ places, placeDetails = [] }) => {
  const [expandedId, setExpandedId] = useState(null);

  if (!places || places.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No attractions found for this location.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {places.map((place, index) => {
        const properties = place.properties;
        const details = placeDetails[index];
        const isExpanded = expandedId === properties.place_id;

        return (
          <div 
            key={properties.place_id} 
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
          >
         
            <div className="h-48 overflow-hidden bg-gray-200">
              {details?.image && (
                <img 
                  src={details.image} 
                  alt={properties.name}
                  className="w-full h-full object-cover"
                />
              )}
              {!details?.image && (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  🏞️ No image available
                </div>
              )}
            </div>

 
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-gray-800 truncate">
                  {properties.name}
                </h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {properties.distance?.toFixed(0)}m
                </span>
              </div>

              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {properties.categories?.slice(0, 3).map((category, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {category.split('.').pop()}
                    </span>
                  ))}
                </div>
              </div>

         
              <p className="text-sm text-gray-600 mt-3">
                📍 {properties.formatted || properties.address_line2 || 'Address not available'}
              </p>

    
              {(details?.website || details?.contact) && (
                <div className="mt-3 flex gap-2">
                  {details.website && (
                    <a 
                      href={details.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                       Website
                    </a>
                  )}
                  {details.contact && (
                    <span className="text-sm text-gray-500">
                       {details.contact}
                    </span>
                  )}
                </div>
              )}

              {details?.description && (
                <div className="mt-4">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : properties.place_id)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {isExpanded ? 'Show Less' : 'Read More...'}
                  </button>
                  
                  {isExpanded && (
                    <p className="mt-2 text-gray-700 text-sm">
                      {details.description}
                    </p>
                  )}
                </div>
              )}

              {details?.opening_hours && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500">Opening Hours:</p>
                  <p className="text-sm text-gray-700">
                    {details.opening_hours}
                  </p>
                </div>
              )}

      
              {details?.rating && (
                <div className="mt-3 flex items-center">
                  <div className="text-yellow-500">⭐</div>
                  <span className="ml-2 text-gray-700 font-medium">
                    {details.rating.toFixed(1)}/5
                  </span>
                  {details.reviews && (
                    <span className="ml-2 text-sm text-gray-500">
                      ({details.reviews} reviews)
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlaceDetails;