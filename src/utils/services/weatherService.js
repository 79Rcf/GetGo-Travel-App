const getMeteo = async (latitude, longitude) => {
    const apiBaseUrl = import.meta.env.VITE_WEATHER_API_BASE_URL;    
    try {
        const response = await fetch(`${apiBaseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(`API Error: ${data.error}`);
        }
        return data;
    } catch (error) {
        console.error("Failed to fetch weather:", error);     
        throw error;
    }
}


export default getMeteo;