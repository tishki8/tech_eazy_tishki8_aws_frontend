// RouteFinder.js
import React, { useState } from 'react';

function RouteFinder() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState([]);

  const handleFindRoute = async () => {
    const response = await fetch(`/shortest-route?source=${source}&destination=${destination}`);
    const data = await response.json();
    setRoute(data.route);
  };

  return (
    <div>
      <h2>Shortest Route Finder</h2>
      <input placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
      <input placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
      <button onClick={handleFindRoute}>Find Route</button>
      {route.length > 0 && (
        <div>
          <h3>Route:</h3>
          <ul>{route.map((node, index) => <li key={index}>{node}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

export default RouteFinder;
