const getCountry = async (name) => {
  const apiBaseUrl = 'https://restcountries.com/v3.1';
  
  try {
    const url = `${apiBaseUrl}/name/${encodeURIComponent(name)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {
      const countryData = data[0];
      return countryData;
    } else {
      throw new Error(`Country "${name}" not found`);
    }
    
  } catch (error) {
    console.error("Failed to fetch country:", error);
    throw error;
  }
}

export default getCountry