const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
const baseUrl = 'https://api.pexels.com/v1';

const getPexelsImages = async (query, perPage = 1) => {
    try {
        const searchQuery = query || 'travel';
        
        const response = await fetch(
            `${baseUrl}/search?query=${encodeURIComponent(searchQuery)}&per_page=${perPage}`,
            {
                headers: {
                    'Authorization': apiKey 
                }
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Failed to fetch Pexels images:', error);
        return null;
    }
}

export default getPexelsImages;