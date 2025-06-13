import React, { useEffect, useState } from 'react';
import { getParcelSummary } from './api';

function ParcelSummary({ token }) {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    getParcelSummary(token).then((res) => setSummary(res.data));
  }, [token]);

  return (
    <div>
      <h3>Parcel Summary (Grouped by Pincode)</h3>
      <ul>
        {Object.entries(summary).map(([pincode, count]) => (
          <li key={pincode}>{pincode}: {count} parcels</li>
        ))}
      </ul>
    </div>
  );
}

export default ParcelSummary;
