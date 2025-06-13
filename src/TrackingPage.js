// TrackingPage.js
import React, { useState } from 'react';

function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState(null);

  const handleTrack = async () => {
    const response = await fetch(`/track?tracking_id=${trackingId}`);
    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <h2>Track Your Parcel</h2>
      <input placeholder="Tracking ID" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} />
      <button onClick={handleTrack}>Track</button>
      {result && (
        <div>
          <p>Status: {result.status}</p>
          <p>Location: {result.location}</p>
        </div>
      )}
    </div>
  );
}

export default TrackingPage;
