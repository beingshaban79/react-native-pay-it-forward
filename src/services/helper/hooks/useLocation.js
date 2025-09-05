import {useEffect, useState, useCallback} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {requestLocationPermission} from '../methods/permissions';

export function useLocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    const granted = await requestLocationPermission();
    if (!granted) {
      setError('Permission denied');
      setLoading(false);
      return null;
    }

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        pos => {
          const coords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          setLocation(coords);
          setLoading(false);
          resolve(coords);
        },
        err => {
          console.error('Error getting location:', err);
          setError(err.message);
          setLoading(false);
          reject(err);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  }, []);

  // Optionally fetch on mount
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return {location, loading, error, refresh: getLocation};
}
