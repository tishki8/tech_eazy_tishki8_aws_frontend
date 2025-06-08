import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export const getParcels = () => axios.get(`${BASE_URL}/parcels`);
export const createParcel = (parcel) => axios.post(`${BASE_URL}/parcels`, parcel);
export const deleteParcel = (trackingNumber) => axios.delete(`${BASE_URL}/parcels/${trackingNumber}`);
export const updateParcel = (trackingNumber, updatedParcel) => axios.put(`${BASE_URL}/parcels/${trackingNumber}`, updatedParcel);
