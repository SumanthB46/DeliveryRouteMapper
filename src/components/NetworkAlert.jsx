import React, { useEffect, useState } from 'react';

const NetworkAlert = () => {
  const [type, setType] = useState('unknown');

  useEffect(() => {
    const connection = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
    if (connection) {
      const update = () => setType(connection.effectiveType);
      connection.addEventListener('change', update);
      update();
      return () => connection.removeEventListener('change', update);
    }
  }, []);

  return (
    <div className="network-status">
      <strong>🌐 Network:</strong> {type}
      {type === '2g' && <span style={{ color: 'red' }}> – Poor connection</span>}
    </div>
  );
};

export default NetworkAlert;