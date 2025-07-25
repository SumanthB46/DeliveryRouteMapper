import React, { useEffect } from 'react';
import LocationTracker from './components/LocationTracker';
import CanvasRoute from './components/CanvasRoute';
import NetworkAlert from './components/NetworkAlert';

export default function App() {
  useEffect(() => {
  if (!localStorage.getItem("deliveryRoute")) {
    const testRoute = [
      { lat: 13.0638, lng: 77.5268 },
      { lat: 13.0639, lng: 77.5270 },
      { lat: 13.0641, lng: 77.5273 },
      { lat: 13.0643, lng: 77.5276 },
      { lat: 13.0645, lng: 77.5279 },
      { lat: 13.0647, lng: 77.5281 }
    ];
    localStorage.setItem("deliveryRoute", JSON.stringify(testRoute));
  }
}, []);


  return (
    <div className="app">
      <h1>📦 Delivery Route Mapper</h1>
      <p>Live delivery tracking with Web APIs</p>
      <NetworkAlert />
      <LocationTracker />
      <CanvasRoute />
    </div>
  );
}
