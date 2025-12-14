
import React from 'react';

const AviationStackCard = ({ flightData }) => {
  
  if (!flightData || flightData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-bold text-lg mb-2">Flight Information</h3>
        <p className="text-gray-500">No flight data available</p>
      </div>
    );
  }


  const airports = flightData
    .map(flight => flight.departure)
    .filter((airport, index, self) => 
      airport?.iata && self.findIndex(a => a.iata === airport.iata) === index
    )
    .slice(0, 5); 

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl">Flight & Airport Information</h3>
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
          {flightData.length} flights
        </span>
      </div>

  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
      
        <div>
          <h4 className="font-bold text-lg mb-3 text-gray-700 border-b pb-2">
            Active Flights
          </h4>
          <div className="space-y-4">
            {flightData.slice(0, 3).map((flight, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-lg">
                      {flight.departure?.iata} → {flight.arrival?.iata}
                    </div>
                    <div className="text-sm text-gray-600">
                      {flight.airline?.name || 'Unknown Airline'}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    flight.flight_status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {flight.flight_status}
                  </span>
                </div>
                
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Departure:</span>
                    <div className="font-medium">{flight.departure?.airport}</div>
                    <div className="text-xs">{flight.departure?.scheduled}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Arrival:</span>
                    <div className="font-medium">{flight.arrival?.airport}</div>
                    <div className="text-xs">{flight.arrival?.scheduled}</div>
                  </div>
                </div>
                
                {flight.flight?.number && (
                  <div className="mt-2 text-xs text-gray-500">
                    Flight: {flight.flight.number}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

     
        <div>
          <h4 className="font-bold text-lg mb-3 text-gray-700 border-b pb-2">
            Major Airports
          </h4>
          
          {airports.length > 0 ? (
            <ul className="space-y-3">
              {airports.map((airport, index) => (
                <li key={index} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                      <span className="font-bold text-blue-700">{airport.iata}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{airport.airport || 'Unknown Airport'}</div>
                      <div className="text-sm text-gray-600">
                        {airport.city && <span>{airport.city}, </span>}
                        {airport.country}
                      </div>
                      <div className="flex text-xs text-gray-500 mt-1">
                        <span className="mr-3">IATA: {airport.iata}</span>
                        {airport.icao && <span>ICAO: {airport.icao}</span>}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No airport data available</p>
          )}
        
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h5 className="font-semibold text-sm text-gray-600 mb-2">Flight Status Legend</h5>
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span>Active</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                <span>Scheduled</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                <span>Cancelled</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-500 rounded-full mr-1"></div>
                <span>Unknown</span>
              </div>
            </div>
          </div>
        </div>
      </div>

   
      <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
        <p>
          Data provided by Aviationstack API • Updates may be delayed • 
          Showing {flightData.length} of {flightData.length} active flights
        </p>
      </div>
    </div>
  );
};

export default AviationStackCard;