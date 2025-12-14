const getCurrency = async () => {
    const url = import.meta.env.VITE_CURRENCY_API_URL;
    
    if (!url) {
        throw new Error('Currency API URL is not configured. Check your .env file');
    }    
    try {
        const response = await fetch(url);
        
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} for ${url}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(`API Error: ${data.error.message || data.error}`);
        }
        return data;
        
    } catch (error) {
        console.error('Failed to fetch currency:', error.message);
        throw error; 
    }
}

export default getCurrency;