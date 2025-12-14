import { useState, useEffect } from 'react';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lon: longitude });
      setIsLoading(false);
    };

    const handleError = (error) => {
      let errorMessage = 'Unable to retrieve your location';
      
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Location access denied. Using default location.';
          setUserLocation({ lat: 48.8566, lon: 2.3522 });
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information unavailable. Using default location.';
          setUserLocation({ lat: 48.8566, lon: 2.3522 });
          break;
        case error.TIMEOUT:
          errorMessage = 'Location request timed out. Using default location.';
          setUserLocation({ lat: 48.8566, lon: 2.3522 });
          break;
        default:
          errorMessage = 'An unknown error occurred. Using default location.';
          setUserLocation({ lat: 48.8566, lon: 2.3522 });
      }
      
      setLocationError(errorMessage);
      setIsLoading(false);
    };

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 600000 
    });

  }, []);

  return { userLocation, locationError, isLoading };
};

export default useUserLocation;