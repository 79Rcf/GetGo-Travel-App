const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;
const baseUrl = 'https://api.geoapify.com/v2/places';

const getPlaces = async (
  lat,
  lon,
  categories = "tourism",
  radius = 50000,
  limit = 15
) => {

  const searchLat = lat || 0;
  const searchLon = lon || 0;
  
  const url = `${baseUrl}?categories=${categories}&filter=circle:${searchLon},${searchLat},${radius}&limit=${limit}&apiKey=${apiKey}`;
  
  console.log('Fetching places from:', url);
  
  try {
    const response = await fetch(url);
    console.log('Places API Response Status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Geoapify API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log(' Places API data received:', data.features.length, 'places');
    

    if (data.features.length === 0) {
      console.log('⚠️ No tourism places found, trying broader categories...');
      return await getPlacesWithFallback(searchLat, searchLon, radius, limit);
    }
    
    return data.features;
  } catch (error) {
    console.error(" Critical error fetching places:", error.message);
    throw error;
  }
};

const getPlacesWithFallback = async (lat, lon, radius, limit) => {
  const fallbackCategories = [
    "accommodation", 
    "catering",      
    "commercial",
    "entertainment", 
    "natural",      
    "religion",    
    "sport"   
  ];
  
  for (const category of fallbackCategories) {
    try {
      const url = `${baseUrl}?categories=${category}&filter=circle:${lon},${lat},${radius}&limit=${limit}&apiKey=${apiKey}`;
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        if (data.features.length > 0) {
          console.log(`Found ${data.features.length} places in category: ${category}`);
          return data.features;
        }
      }
    } catch (error) {
      continue;
    }
  }
  
  console.log('⚠️ No places found in any category');
  return [];
};

const getPlaceDetails = async (placeId) => {
};

export default { getPlaces, getPlaceDetails };