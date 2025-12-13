import React from 'react';

const TourCard = ({ countryName = 'Destination' }) => {
  // Mock tour data - replace with real API if you get Viator access
  const mockTours = [
    {
      id: 1,
      title: 'City Highlights Tour',
      description: 'Explore major landmarks and historical sites with a local guide.',
      duration: '4 hours',
      price: 65,
      rating: 4.8,
      reviewCount: 342,
      category: 'Walking Tour',
      image: '🏛️'
    },
    {
      id: 2,
      title: 'Food & Culture Experience',
      description: 'Taste local cuisine and learn about culinary traditions.',
      duration: '3 hours',
      price: 45,
      rating: 4.9,
      reviewCount: 218,
      category: 'Food Tour',
      image: '🍲'
    },
    {
      id: 3,
      title: 'Nature & Scenery Adventure',
      description: 'Visit natural wonders and scenic viewpoints.',
      duration: '6 hours',
      price: 89,
      rating: 4.7,
      reviewCount: 156,
      category: 'Adventure',
      image: '⛰️'
    },
    {
      id: 4,
      title: 'Historical Sites Pass',
      description: 'Access to multiple museums and historical attractions.',
      duration: 'Full day',
      price: 75,
      rating: 4.6,
      reviewCount: 89,
      category: 'Cultural',
      image: '🏰'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Tours & Activities</h2>
          <p className="text-gray-600 mt-1">Curated experiences in {countryName}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
            Popular
          </span>
        </div>
      </div>

      {/* Tour Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTours.map((tour) => (
          <div 
            key={tour.id} 
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Tour Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{tour.image}</span>
                    <div>
                      <h3 className="font-bold text-lg">{tour.title}</h3>
                      <span className="text-xs text-gray-500">{tour.category}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{tour.description}</p>
                </div>
              </div>
            </div>

            {/* Tour Details */}
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

              {/* Rating */}
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

              {/* Action Buttons */}
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

      {/* Viator Integration Note */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="text-blue-600">ℹ️</div>
          <div>
            <h4 className="font-semibold text-blue-800">Tour Booking Integration</h4>
            <p className="text-sm text-blue-700 mt-1">
              This section displays sample tour data. In a production environment, 
              this would integrate with Viator's API to show real, bookable tours 
              with live availability and pricing.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs bg-white text-blue-700 px-2 py-1 rounded">
                API: Viator/GetYourGuide
              </span>
              <span className="text-xs bg-white text-blue-700 px-2 py-1 rounded">
                Real-time Availability
              </span>
              <span className="text-xs bg-white text-blue-700 px-2 py-1 rounded">
                Secure Booking
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Load More Button */}
      <div className="mt-6 text-center">
        <button className="inline-flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors">
          <span>View All Tours</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default TourCard;