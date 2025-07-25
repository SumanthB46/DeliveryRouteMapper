import React, { useEffect, useRef } from 'react';

const CanvasRoute = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawRoute = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const path = JSON.parse(localStorage.getItem('deliveryRoute') || '[]');
      if (path.length < 2) return;

      const lats = path.map(p => p.lat);
      const lngs = path.map(p => p.lng);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      const padding = 20;
      const width = canvas.width - padding * 2;
      const height = canvas.height - padding * 2;

      const latRange = maxLat - minLat || 0.0001;
      const lngRange = maxLng - minLng || 0.0001;

      const toCanvasCoords = ({ lat, lng }) => ({
        x: ((lng - minLng) / lngRange) * width + padding,
        y: ((maxLat - lat) / latRange) * height + padding
      });

      ctx.beginPath();
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 2;

      path.forEach((point, index) => {
        const { x, y } = toCanvasCoords(point);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      const start = toCanvasCoords(path[0]);
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.arc(start.x, start.y, 5, 0, 2 * Math.PI);
      ctx.fill();

      const end = toCanvasCoords(path[path.length - 1]);
      ctx.beginPath();
      ctx.fillStyle = 'blue';
      ctx.arc(end.x, end.y, 5, 0, 2 * Math.PI);
      ctx.fill();
    };

    drawRoute();
    const interval = setInterval(drawRoute, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <button
        onClick={() => {
          localStorage.setItem('deliveryRoute', JSON.stringify([
            { lat: 13.0638, lng: 77.5269 },
            { lat: 13.0640, lng: 77.5272 },
            { lat: 13.0645, lng: 77.5275 },
            { lat: 13.0650, lng: 77.5280 }
          ]));
          window.location.reload();
        }}
      >
        Load Test Route
      </button>

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="canvas-box"
      />
    </div>
  );
};

export default CanvasRoute;
