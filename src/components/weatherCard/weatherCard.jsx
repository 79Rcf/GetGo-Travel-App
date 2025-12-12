import React from 'react';


const celsiusToFahrenheit = (c) => {
    if (c === undefined || c === null) return '--';
    return Math.round((c * 9/5) + 32);
};

const WeatherCard = ({ weather }) => {
    if (!weather || !weather.current_weather) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold text-lg mb-2">Weather</h3>
                <p className="text-gray-500">Weather data not available</p>
                <p className="text-xs text-gray-400 mt-2">
                    Available data: {weather ? Object.keys(weather).join(', ') : 'none'}
                </p>
            </div>
        );
    }

    const { current_weather, current_weather_units } = weather;
    const currentTempC = current_weather.temperature;
    const currentTempF = celsiusToFahrenheit(currentTempC);
    const tempUnit = current_weather_units?.temperature || '°C';

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-lg mb-4">Current Weather</h3>
            <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                    {currentTempC}°C
                </div>
                <div className="text-lg text-gray-600">
                    {currentTempF}°F
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    {getWeatherCondition(current_weather.weathercode)}
                </p>
                
         
                <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Wind:</span>
                        <span>{current_weather.windspeed} km/h</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Wind Direction:</span>
                        <span>{current_weather.winddirection}°</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span>
                            {weather.latitude?.toFixed(2)}°N, {weather.longitude?.toFixed(2)}°E
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getWeatherCondition = (code) => {
    const conditions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        56: 'Light freezing drizzle',
        57: 'Dense freezing drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
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
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with hail',
        99: 'Heavy thunderstorm with hail'
    };
    return conditions[code] || 'Unknown';
};

export default WeatherCard;