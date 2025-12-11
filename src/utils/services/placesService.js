const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;
const baseUrl = 'https://api.geoapify.com/v2/places';

const getPlaces = async (lat, lon, categories = 'tourism', radius = 5000, limit = 15) => {
    console.log(' Fetching places from Geoapify...');
    const url = `${baseUrl}?categories=${categories}&filter=circle:${lon},${lat},${radius}&limit=${limit}&apiKey=${apiKey}`;

    console.log('API URL:', url);

    try {
        const response = await fetch(url);
        console.log(' Response status:', response.status);

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Geoapify API key is missing or invalid. Check your .env file.'[citation]);
            }
            throw new Error(`Geoapify API request failed: ${response.status}`);
        }

        const data = await response.json();
        console.log(' API Success! Data type is:', data.type);
        return data.features || [];

    } catch (error) {
        console.error(' Critical error:', error.message);
        throw error;
    }
}

export default getPlaces;