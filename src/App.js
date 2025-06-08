import React, { useState } from 'react';
import ParcelForm from './parcelForm';
import ParcelGrid from './parcelGrid';

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshParcels = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  return (
    <div>
      <ParcelForm onParcelCreated={refreshParcels} />
      <ParcelGrid key={refreshKey} />
    </div>
  );
};

export default App;
