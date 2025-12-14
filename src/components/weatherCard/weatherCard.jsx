import React from 'react';

const celsiusToFahrenheit = (c) => {
    if (c === undefined || c === null) return '--';
    return Math.round((c * 9/5) + 32);
};

const getWeatherCondition = (code) => {
    const conditions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly Cloudy',
        3: 'Overcast',
        4: 'Smoke/Haze', 
        5: 'Haze',
        6: 'Widespread dust',
        10: 'Mist',
        45: 'Fog',
        48: 'Depositing rime fog',
        

        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        56: 'Light freezing drizzle',
        57: 'Dense freezing drizzle',
        

        60: 'Slight intermittent rain', 
        61: 'Slight rain',
        62: 'Moderate intermittent rain', 
        63: 'Moderate rain',
        64: 'Heavy intermittent rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Heavy freezing rain',
        

        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        

        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        83: 'Slight rain/snow showers',
        84: 'Moderate/Heavy rain/snow showers', 
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        

        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail', 
        99: 'Heavy thunderstorm with hail'
    };

    if (code >= 11 && code <= 19) return 'Precipitation nearby';
    return conditions[code] || 'Unknown Weather Code';
};


const getWeatherIcon = (code) => {
    if ([0, 1].includes(code)) return '☀️';
    if ([2, 3].includes(code)) return '🌤️'; 
    if ([4, 5, 6, 10, 45, 48].includes(code)) return '🌫️';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 77) return '❄️'; 
    if (code >= 80 && code <= 84) return '⛈️'; 
    if (code >= 85 && code <= 86) return '🌨️'; 
    if (code >= 95) return '🌩️'; 
    return '❓';
};

const getDetailIcon = (type) => {
    switch (type) {
        case 'feelsLike': return '🌡️'; 
        case 'humidity': return '💧';
        case 'wind': return '🌬️';
        default: return '❓';
    }
};



const InfoCard = ({ icon, label, value }) => (

    <div className="flex-1 bg-teal-500/50 rounded-lg p-3 flex flex-col items-center justify-center min-w-0">
        <div className="text-xl mb-1 h-6">
            {icon}
        </div>
        <p className="text-xs font-light opacity-80">{label}</p>
        <p className="text-base font-semibold">{value}</p>
    </div>
);


const WeatherCard = ({ weather, locationName = 'Location Unknown', windUnits = 'km/h' }) => {
    
    if (!weather || !weather.current_weather) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold text-lg mb-2">Weather</h3>
                <p className="text-gray-500">Weather data not available</p>
            </div>
        );
    }

    const { current_weather } = weather;
    
    const currentTempC = current_weather.temperature;
    const conditionCode = current_weather.weathercode;
    const windSpeed = current_weather.windspeed;
    

    const conditionText = getWeatherCondition(conditionCode);
    const mainIcon = getWeatherIcon(conditionCode);
    

    const feelsLikeC = current_weather.apparent_temperature || (currentTempC - 2); 
    const humidity = current_weather.relative_humidity_2m || 65; 
    


    return (

        <div className="bg-teal-500 text-white rounded-xl shadow-2xl p-6 max-w-sm mx-auto font-sans">
            
            <div className="flex justify-between items-start mb-6">
                <div>
                    <p className="text-lg font-light opacity-80">Current Weather</p>

                    <h2 className="text-4xl font-semibold">{locationName}</h2>
                </div>
                <div className="text-6xl -mt-2">
                    {mainIcon}
                </div>
            </div>

            <div className="mb-6">
                <div className="flex items-start">
                    <span className="text-9xl font-light leading-none">
                        {Math.round(currentTempC)}
                    </span>
                    <span className="text-5xl font-light mt-4">
                        °C
                    </span>
                </div>

                <p className="text-3xl font-light mt-2">{conditionText}</p>
            </div>

            <div className="flex space-x-3 mt-4">
                
                <InfoCard
                    icon={getDetailIcon('feelsLike')}
                    label="Feels like"
                    value={`${Math.round(feelsLikeC)}°`}
                />
                
                <InfoCard
                    icon={getDetailIcon('humidity')}
                    label="Humidity"
                    value={`${humidity}%`}
                />
                
                <InfoCard
                    icon={getDetailIcon('wind')}
                    label="Wind"
                    value={`${Math.round(windSpeed)} ${windUnits}`}
                />
            </div>
        </div>
    );
};

export default WeatherCard;