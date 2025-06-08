import React, { useState } from 'react';
import { createParcel } from './api';

const ParcelForm = ({ onParcelCreated }) => {
  const [form, setForm] = useState({
    customerName: '',
    deliveryAddress: '',
    contactNumber: '',
    parcelSize: '',
    parcelWeight: '',
    trackingNumber: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createParcel(form);
      setForm({
        customerName: '',
        deliveryAddress: '',
        contactNumber: '',
        parcelSize: '',
        parcelWeight: '',
        trackingNumber: ''
      });
      onParcelCreated();  // refresh the grid after adding parcel
    } catch (error) {
      console.error('Error creating parcel:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(form).map(key => (
        <input
          key={key}
          name={key}
          value={form[key]}
          onChange={handleChange}
          placeholder={key}
          required
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ParcelForm;
