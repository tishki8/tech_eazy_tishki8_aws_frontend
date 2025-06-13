import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

// ✅ Login with JSON body
export const login = async ({ username, password }) => {
  return axios.post(`${BASE_URL}/token`, {
    username,
    password
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

// ✅ Get today's delivery orders
export const getTodayOrders = async (token) => {
  return axios.get(`${BASE_URL}/delivery-orders/today`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// ✅ Get today's parcel summary
export const getParcelSummary = async (token) => {
  return axios.get(`${BASE_URL}/parcels/today`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// ✅ Upload a file with vendor name
export const uploadFile = async (vendorName, file, token) => {
  const formData = new FormData();
  formData.append('vendor_name', vendorName);
  formData.append('file', file);

  return axios.post(`${BASE_URL}/upload-orders`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};
