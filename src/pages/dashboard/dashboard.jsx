import { useEffect, useState } from 'react'
import getMeteo from '../../services/weatherService'
import getCountry from '../../services/countryService'
import getCurrency from '../../services/currencyService'
import getFlight from '../../services/airportService'
import getPlace from '../../services/placesService'


const Dashboard = () => {
    const [meteo, setMeteo] = useState(null);
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [flight, setFlight] = useState(null);
    const [place, setPlace] = useState(null);
 


    useEffect(() => {
       
        const destinationLat = 48.8566; 
        const destinationLon = 2.3522;  
        
        getPlace(destinationLat, destinationLon, 'tourism') 
            .then(fetchedPlaces => { 
                setPlace(fetchedPlaces); 
            })
            .catch(error => {
                console.error("Failed to fetch places:", error.message);
                setError(`Place error: ${error.message}`);
            });
    }, []);

    useEffect(() => {
        getFlight()
            .then((data) => {
                setFlight(data);
            })
            .catch(error => {
                console.error("Failed to fetch flight:", error.message);
                setError(`Flight error: ${error.message}`);
            });
    }, []);

    useEffect(() => {
        getCountry('france')
            .then((data) => {
                setCountry(data);
            })
            .catch(error => {
                console.error("Failed to fetch country:", error.message);
                setError(`Country error: ${error.message}`);
            });
    }, []);

    useEffect(() => {
        getMeteo(51.057, -0.123)
            .then((data) => {
                setMeteo(data);
            })
            .catch(error => {
                console.error("Failed to fetch weather:", error.message);
                setError(`Weather error: ${error.message}`);
            });
    }, []);

    useEffect(() => {
        getCurrency()
            .then((data) => {
                setCurrency(data);
            })
            .catch(error => {
                console.error("error fetching currency:", error.message);
                setError(`Currency error: ${error.message}`);
            });
    }, []);

    return (
        <>
            {error && <div style={{color: 'red'}}>Error: {error}</div>}
            
            <h2>Weather Data:</h2>
            <div>{meteo ? JSON.stringify(meteo.current_weather) : "Loading weather..."}</div>
            
            <h2>Country Data:</h2>
            <div>{country ? JSON.stringify(country.name) : "Loading country..."}</div>
            
            <h2>Currency Rates:</h2>
            <div>{currency ? JSON.stringify(currency) : "Loading currency..."}</div>
            
            <h2>Active Flights:</h2>
            <div>{flight ? JSON.stringify(flight) : "Loading flight..."}</div>
            <h2>Destinations:</h2>
<div className='text-2xl'>
    {place ? (
        place.map((singlePlace, index) => (
            <div key={index}>
                <h3>{singlePlace.properties.name}</h3>
                <p>{singlePlace.properties.categories?.join(', ')}</p>
            </div>
        ))
    ) : (
        "Loading places..."
    )}
</div>

        </>
    )
}



export default Dashboard;