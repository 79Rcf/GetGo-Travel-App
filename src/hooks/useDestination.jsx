import { useQuery } from '@tanstack/react-query';

import getCountry from '../utils/services/countryService';
import getWeather from '../utils/services/weatherService.js';
import getCurrency from '../utils/services/currencyService';
import getAirports from '../utils/services/airportService';
import placesService from '../utils/services/placesService';

function useDestination(destinationName) {
 
  const countryQuery = useQuery({
    queryKey: ['country', destinationName],
    queryFn: () => getCountry(destinationName),
  });
  
  const countryData = countryQuery.data;
  const lat = countryData?.latlng?.[0]; 
  const lon = countryData?.latlng?.[1]; 
  const currencyCode = countryData?.currencies ? Object.keys(countryData.currencies)[0] : null;
  const countryCode = countryData?.cca2;


  const weatherQuery = useQuery({
    queryKey: ['weather', destinationName, lat, lon],
    queryFn: () => getWeather(lat, lon),
    enabled: !!lat && !!lon,
  });
  
  const currencyQuery = useQuery({
    queryKey: ['currency', destinationName, currencyCode],
    queryFn: () => getCurrency(currencyCode),
    enabled: !!currencyCode, 
  });

  const airportsQuery = useQuery({
    queryKey: ['airports', destinationName, countryCode],
    queryFn: () => getAirports(countryCode),
    enabled: !!countryCode,
    staleTime: 1000 * 60 * 60 * 24, 
    gcTime: 1000 * 60 * 60 * 24 * 7, 
    refetchOnMount: false, 
});

const placesQuery = useQuery({
  queryKey: ['places', destinationName, lat, lon],
  queryFn: () => placesService.getPlaces(lat, lon), // Changed this
  enabled: !!lat && !!lon,
});

const placeDetailsQuery = useQuery({
  queryKey: ['placeDetails', destinationName],
  queryFn: async () => {
    if (!placesQuery.data || placesQuery.data.length === 0) return [];
    
    const topPlaces = placesQuery.data.slice(0, 3);
    const detailsPromises = topPlaces.map(place => 
      placesService.getPlaceDetails(place.properties.place_id) // Changed this
    );
    
    const details = await Promise.all(detailsPromises);
    return details.filter(detail => detail !== null);
  },
  enabled: !!placesQuery.data && placesQuery.data.length > 0,
});


  const isLoading = countryQuery.isLoading || 
                    weatherQuery.isLoading || 
                    currencyQuery.isLoading || 
                    airportsQuery.isLoading || 
                    placesQuery.isLoading;

  const error = countryQuery.error || 
                weatherQuery.error || 
                currencyQuery.error || 
                airportsQuery.error || 
                placesQuery.error;


  return {
   
    country: countryData,
    weather: weatherQuery.data,
    currency: currencyQuery.data,
    airports: airportsQuery.data,
    places: placesQuery.data,
    

    isLoading,
    isError: !!error,
    error,
    
    statuses: {
      country: countryQuery.status,
      weather: weatherQuery.status,
      currency: currencyQuery.status,
      airports: airportsQuery.status,
      places: placesQuery.status,

    }
  };
}


export default useDestination;