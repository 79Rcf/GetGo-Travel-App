import { useQuery } from '@tanstack/react-query';

import getCountry from '../utils/services/countryService';
import getWeather from '../utils/services/weatherService';
import getCurrency from '../utils/services/currencyService';
import getAirports from '../utils/services/airportService';
import getPlaces from '../utils/services/placesService'; 

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
  });

  const placesQuery = useQuery({
    queryKey: ['places', destinationName, lat, lon],
    queryFn: () => getPlaces(lat, lon), 
    enabled: !!lat && !!lon, 
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