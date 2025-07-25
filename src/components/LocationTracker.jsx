import React, { useEffect, useState } from 'react';

const LocationTracker = () => {
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      alert('Geolocation is not supported in this browser.');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords((prev) => [...prev, { lat: latitude, lng: longitude }]);
        localStorage.setItem('deliveryRoute', JSON.stringify([...coords, { lat: latitude, lng: longitude }]));
      },
      (err) => console.error('Error:', err),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="tracker">
      <h3>📍 Location Updates: {coords.length}</h3>
      {coords.length > 0 && (
        <p>Current: {coords[coords.length - 1].lat.toFixed(4)}, {coords[coords.length - 1].lng.toFixed(4)}</p>
      )}
    </div>
  );
};

export default LocationTracker;