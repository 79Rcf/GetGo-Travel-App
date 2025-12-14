const baseUrl = import.meta.env.VITE_AVAITIONSTACK_API_URL;
const avaisionApiKey = import.meta.env.VITE_AVAITIONSTACK_API_KEY;

const getFlight = async () => {
    const params = new URLSearchParams({
        access_key: avaisionApiKey,
        flight_status: "active",
        dep_iata: "LHR",
        limit: 5
    });
    
    try {
        const response = await fetch(`${baseUrl}?${params}`);
        
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Failed to fetch flight:", error);
        return null;
    }
}

export default getFlight;