// src/components/tours/TourMiniCard.jsx (alternative)
import React from 'react';

const TourMiniCard = () => (
  <div className="bg-white rounded-lg shadow p-4">
    <div className="flex justify-between items-center mb-3">
      <h3 className="font-bold">Popular Tours</h3>
      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
        Top Rated
      </span>
    </div>
    
    <div className="space-y-3">
      {[
        { name: 'City Tour', price: '$65', emoji: '🚶' },
        { name: 'Food Experience', price: '$45', emoji: '🍽️' },
        { name: 'Museum Pass', price: '$75', emoji: '🏛️' }
      ].map((tour, idx) => (
        <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
          <div className="flex items-center gap-2">
            <span className="text-lg">{tour.emoji}</span>
            <span className="text-sm">{tour.name}</span>
          </div>
          <span className="font-semibold text-blue-600">{tour.price}</span>
        </div>
      ))}
    </div>
    
    <button className="w-full mt-3 text-sm text-blue-600 hover:text-blue-800">
      View all tours →
    </button>
  </div>
);

export default TourMiniCard;