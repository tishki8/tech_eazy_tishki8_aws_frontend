import React, { useEffect, useState } from 'react';
import { getParcels, deleteParcel } from './api';

const ParcelGrid = () => {
  const [parcels, setParcels] = useState([]);

  const fetchParcels = async () => {
    try {
      const response = await getParcels();
      setParcels(response.data);
    } catch (error) {
      console.error('Error fetching parcels:', error);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  const handleDelete = async (trackingNumber) => {
    try {
      await deleteParcel(trackingNumber);
      fetchParcels();
    } catch (error) {
      console.error('Error deleting parcel:', error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Delivery Address</th>
          <th>Tracking Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {parcels.map(parcel => (
          <tr key={parcel.trackingNumber}>
            <td>{parcel.customerName}</td>
            <td>{parcel.deliveryAddress}</td>
            <td>{parcel.trackingNumber}</td>
            <td>
              <button onClick={() => handleDelete(parcel.trackingNumber)}>Delete</button>
              {/* Add Edit button here later */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ParcelGrid;
