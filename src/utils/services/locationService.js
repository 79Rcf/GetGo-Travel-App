const getCountryByCoordinates = async (lat, lon) => {
    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&type=country&format=json&apiKey=${apiKey}`;
    
    try {      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        throw new Error('No results found for these coordinates');
      }
      
      const countryResult = data.results[0];
      return {
        name: {
          common: countryResult.country || 'Unknown Country',
          official: countryResult.country || 'Unknown Country'
        },
        latlng: [lat, lon],
        capital: [countryResult.city || countryResult.county || 'Unknown'],
        region: countryResult.region || 'Unknown',
        population: null,
        flags: {
          png: countryResult.country_code 
            ? `https://flagcdn.com/w320/${countryResult.country_code.toLowerCase()}.png`
            : 'https://flagcdn.com/w320/unknown.png'
        },
        cca2: countryResult.country_code || '',
        currencies: {},
        timezones: countryResult.timezone ? [countryResult.timezone.name] : []
      };
      
    } catch (error) {
      console.error("Error fetching country data:", error);
      
      try {
        const fallbackResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );
        
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          
          return {
            name: {
              common: fallbackData.countryName || 'Unknown',
              official: fallbackData.countryName || 'Unknown'
            },
            latlng: [lat, lon],
            capital: [fallbackData.locality || 'Unknown'],
            region: fallbackData.principalSubdivision || 'Unknown',
            population: null,
            flags: {
              png: fallbackData.countryCode 
                ? `https://flagcdn.com/w320/${fallbackData.countryCode.toLowerCase()}.png`
                : 'https://flagcdn.com/w320/unknown.png'
            },
            cca2: fallbackData.countryCode || '',
            currencies: {},
            timezones: []
          };
        }
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }

      return {
        name: {
          common: 'Cameroon',
          official: 'Republic of Cameroon'
        },
        latlng: [lat, lon],
        capital: ['Yaoundé'],
        region: 'Africa',
        population: 26545864,
        flags: {
          png: 'https://flagcdn.com/w320/cm.png'
        },
        cca2: 'CM',
        currencies: { XAF: { name: 'Central African CFA franc', symbol: 'Fr' } },
        timezones: ['UTC+01:00']
      };
    }
  };
  
  export default getCountryByCoordinates;