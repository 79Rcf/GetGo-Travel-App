import { useQuery } from '@tanstack/react-query';
import getCountry from '../utils/services/countryService';
import getWeather from '../utils/services/weatherService.js';
import getCurrency from '../utils/services/currencyService';
import getAirports from '../utils/services/airportService';
import placesService from '../utils/services/placesService';
import getCountryByCoordinates from '../utils/services/locationService';


async function getPlaces(lat, lon, countryName) {
  try {
     let placesData = [];
    
    if (placesService && typeof placesService.getPlacesByCoordinates === 'function') {
      placesData = await placesService.getPlacesByCoordinates(lat, lon);

    }
    
    if (!placesData || placesData.length === 0) {
      placesData = getMockPlacesForCountry(countryName || 'Cameroon', lat, lon);
    }
    
    return placesData;
  } catch (error) {
    console.error('Error in getPlaces:', error);
    return getMockPlacesForCountry(countryName || 'Cameroon', lat, lon);
  }
}

function getMockPlacesForCountry(country, lat, lon) {
  if (country === 'Cameroon' || country === 'Republic of Cameroon') {
    return [
      {
        properties: {
          name: "Mount Cameroon",
          categories: ["natural", "mountain", "volcano"],
          formatted: "Buea, Southwest Region, Cameroon",
          place_id: "mount_cameroon_1",
          distance: Math.floor(Math.random() * 50000) + 10000
        }
      },
      {
        properties: {
          name: "Mefou National Park",
          categories: ["park", "wildlife", "animals"],
          formatted: "Yaoundé, Centre Region, Cameroon",
          place_id: "mefou_park_2",
          distance: Math.floor(Math.random() * 120000) + 20000
        }
      },
      {
        properties: {
          name: "Limbe Botanical Garden",
          categories: ["garden", "botanical", "nature"],
          formatted: "Limbe, Southwest Region, Cameroon",
          place_id: "limbe_garden_3",
          distance: Math.floor(Math.random() * 80000) + 15000
        }
      },
      {
        properties: {
          name: "Cameroon National Museum",
          categories: ["museum", "cultural", "history"],
          formatted: "Yaoundé, Cameroon",
          place_id: "museum_4",
          distance: Math.floor(Math.random() * 30000) + 5000
        }
      },
      {
        properties: {
          name: "Waza National Park",
          categories: ["park", "wildlife", "safari"],
          formatted: "Far North Region, Cameroon",
          place_id: "waza_park_5",
          distance: Math.floor(Math.random() * 300000) + 50000
        }
      },
      {
        properties: {
          name: "Kribi Beach",
          categories: ["beach", "coast", "relaxation"],
          formatted: "Kribi, South Region, Cameroon",
          place_id: "kribi_beach_6",
          distance: Math.floor(Math.random() * 150000) + 25000
        }
      },
      {
        properties: {
          name: "Bafut Palace",
          categories: ["historical", "cultural", "architecture"],
          formatted: "Bafut, Northwest Region, Cameroon",
          place_id: "bafut_palace_7",
          distance: Math.floor(Math.random() * 200000) + 30000
        }
      },
      {
        properties: {
          name: "Dja Faunal Reserve",
          categories: ["unesco", "wildlife", "rainforest"],
          formatted: "South Region, Cameroon",
          place_id: "dja_reserve_8",
          distance: Math.floor(Math.random() * 250000) + 40000
        }
      },
      {
        properties: {
          name: "Foumban Royal Palace",
          categories: ["museum", "historical", "art"],
          formatted: "Foumban, West Region, Cameroon",
          place_id: "foumban_palace_9",
          distance: Math.floor(Math.random() * 180000) + 35000
        }
      },
      {
        properties: {
          name: "Lake Nyos",
          categories: ["natural", "lake", "volcanic"],
          formatted: "Northwest Region, Cameroon",
          place_id: "lake_nyos_10",
          distance: Math.floor(Math.random() * 220000) + 45000
        }
      },
      {
        properties: {
          name: "Bamenda Highlands",
          categories: ["mountain", "scenic", "hiking"],
          formatted: "Northwest Region, Cameroon",
          place_id: "bamenda_highlands_11",
          distance: Math.floor(Math.random() * 170000) + 30000
        }
      },
      {
        properties: {
          name: "Douala Maritime Museum",
          categories: ["museum", "maritime", "history"],
          formatted: "Douala, Littoral Region, Cameroon",
          place_id: "douala_museum_12",
          distance: Math.floor(Math.random() * 50000) + 10000
        }
      }
    ];
  } else if (country === 'France' || country === 'French Republic') {
    return [
      {
        properties: {
          name: "Eiffel Tower",
          categories: ["landmark", "tourism", "architecture"],
          formatted: "Paris, France",
          place_id: "eiffel_tower_1",
          distance: Math.floor(Math.random() * 10000) + 1000
        }
      },
      {
        properties: {
          name: "Louvre Museum",
          categories: ["museum", "art", "cultural"],
          formatted: "Paris, France",
          place_id: "louvre_2",
          distance: Math.floor(Math.random() * 8000) + 2000
        }
      },
      {
        properties: {
          name: "Notre-Dame Cathedral",
          categories: ["cathedral", "historical", "religious"],
          formatted: "Paris, France",
          place_id: "notre_dame_3",
          distance: Math.floor(Math.random() * 6000) + 1500
        }
      },
      {
        properties: {
          name: "Mont Saint-Michel",
          categories: ["unesco", "island", "monastery"],
          formatted: "Normandy, France",
          place_id: "mont_saint_michel_4",
          distance: Math.floor(Math.random() * 300000) + 50000
        }
      },
      {
        properties: {
          name: "Palace of Versailles",
          categories: ["palace", "historical", "garden"],
          formatted: "Versailles, France",
          place_id: "versailles_5",
          distance: Math.floor(Math.random() * 20000) + 5000
        }
      }
    ];
  } else {
    return [
      {
        properties: {
          name: "City Center",
          categories: ["urban", "shopping", "dining"],
          formatted: "Downtown Area",
          place_id: "city_center_1",
          distance: Math.floor(Math.random() * 5000) + 1000
        }
      },
      {
        properties: {
          name: "Local Park",
          categories: ["park", "nature", "recreation"],
          formatted: "Green Space Area",
          place_id: "local_park_2",
          distance: Math.floor(Math.random() * 10000) + 2000
        }
      },
      {
        properties: {
          name: "Historical Museum",
          categories: ["museum", "culture", "education"],
          formatted: "Cultural District",
          place_id: "museum_3",
          distance: Math.floor(Math.random() * 8000) + 1500
        }
      },
      {
        properties: {
          name: "Main Square",
          categories: ["public_space", "architecture", "gathering"],
          formatted: "Central Plaza",
          place_id: "main_square_4",
          distance: Math.floor(Math.random() * 3000) + 500
        }
      }
    ];
  }
}

function useDestination(destinationName = null, userCoords = null) {
  const shouldUseUserLocation = !destinationName && userCoords;

  
  const countryQuery = useQuery({
    queryKey: ['country', shouldUseUserLocation ? `${userCoords.lat},${userCoords.lon}` : destinationName],
    queryFn: () => {
      if (shouldUseUserLocation) {
        return getCountryByCoordinates(userCoords.lat, userCoords.lon);
      } else {
        return getCountry(destinationName || 'France');
      }
    },
    enabled: !!(destinationName || userCoords),
  });

  const countryData = countryQuery.data;

  
  const currencyCode = countryData?.currencies ? Object.keys(countryData.currencies)[0] : null;
  const countryCode = countryData?.cca2 || countryData?.cca3;
  
  const lat = userCoords?.lat || countryData?.latlng?.[0];
  const lon = userCoords?.lon || countryData?.latlng?.[1];
  

  const countryName = countryData?.name?.common || countryData?.name?.official;

  const placesQuery = useQuery({
    queryKey: ['places', shouldUseUserLocation ? 'user-location' : destinationName, lat, lon, countryName],
    queryFn: () => getPlaces(lat, lon, countryName),
    enabled: !!lat && !!lon,
  });
  
 

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

  const placeDetailsQuery = useQuery({
    queryKey: ['placeDetails', destinationName, placesQuery.data?.length],
    queryFn: async () => {
      if (!placesQuery.data || placesQuery.data.length === 0) return [];
      
      if (placesQuery.data[0]?.properties?.place_id?.includes('_')) {
        return placesQuery.data.slice(0, 3).map(place => ({
          place_id: place.properties.place_id,
          name: place.properties.name,
          rating: Math.random() * 4 + 1,
          reviews: Math.floor(Math.random() * 1000),
          image: `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 100)}`
        }));
      }
      
      const detailsPromises = placesQuery.data.slice(0, 3).map(place => 
        placesService.getPlaceDetails(place.properties?.place_id || place.place_id)
      );
      
      const details = await Promise.allSettled(detailsPromises);
      
      return details
        .filter(result => result.status === 'fulfilled' && result.value !== null)
        .map(result => result.value);
    },
    enabled: !!placesQuery.data && placesQuery.data.length > 0,
  });

  const isLoading = countryQuery.isLoading || 
                    weatherQuery.isLoading || 
                    currencyQuery.isLoading || 
                    airportsQuery.isLoading || 
                    placesQuery.isLoading ||
                    placeDetailsQuery.isLoading;

  const error = countryQuery.error || 
                weatherQuery.error || 
                currencyQuery.error || 
                airportsQuery.error || 
                placesQuery.error ||
                placeDetailsQuery.error;

  return {
    country: countryData,
    weather: weatherQuery.data,
    currency: currencyQuery.data,
    airports: airportsQuery.data,
    places: placesQuery.data,
    placeDetails: placeDetailsQuery.data,
    
    currencyCode,
    countryCode,
    coordinates: { lat, lon },
    
    isLoading,
    isError: !!error,
    error,
    
    statuses: {
      country: countryQuery.status,
      weather: weatherQuery.status,
      currency: currencyQuery.status,
      airports: airportsQuery.status,
      places: placesQuery.status,
      placeDetails: placeDetailsQuery.status,
    }
  };
}

export default useDestination;