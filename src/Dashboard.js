import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Dashboard({ role }) {
  const [orders, setOrders] = useState([]);
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [summary, setSummary] = useState({});
  const [file, setFile] = useState(null);
  const [vendorName, setVendorName] = useState('');
  const [route, setRoute] = useState([]);

  const API = 'http://localhost:8000';

  // Fetch delivery orders for admin/vendor
  useEffect(() => {
    if (role === 'admin' || role === 'vendor') {
      axios.get(`${API}/delivery-orders`, { params: { role } })
        .then(res => setOrders(res.data))
        .catch(err => console.error(err));
    }
  }, [role]);

  // Fetch parcel summary for admin
  useEffect(() => {
    if (role === 'admin') {
      axios.get(`${API}/parcels-summary`, { params: { role } })
        .then(res => setSummary(res.data))
        .catch(err => console.error(err));
    }
  }, [role]);

  // Upload delivery orders (Vendor only)
  const handleUpload = async () => {
    if (!file || !vendorName) {
      alert("File and Vendor name required");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('vendor_name', vendorName);

    try {
      const res = await axios.post(`${API}/upload-orders?role=vendor`, formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.detail || 'Upload failed');
    }
  };

  // Track package
  const handleTrack = async () => {
    try {
      const res = await axios.get(`${API}/track`, {
        params: { tracking_id: trackingId }
      });
      setTrackingResult(res.data);
    } catch (err) {
      alert("Tracking ID not found");
      setTrackingResult(null);
    }
  };

  // Dummy route fetch (replace with real backend logic)
  const fetchRoute = () => {
    const dummy = ["Warehouse", "Hub 1", "Hub 2", "Customer Address"];
    setRoute(dummy);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard ({role})</h2>

      {role === 'vendor' && (
        <div>
          <h3>Upload Delivery Orders</h3>
          <input
            type="text"
            placeholder="Vendor Name"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
          />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}

      {role === 'admin' && (
        <>
          <h3>All Delivery Orders</h3>
          <ul>
            {orders.map((order, idx) => (
              <li key={idx}>
                {order.vendor_name} - {order.total_orders} orders on {order.date}
              </li>
            ))}
          </ul>

          <h3>Parcel Summary by Pincode</h3>
          <ul>
            {Object.entries(summary).map(([pincode, count], idx) => (
              <li key={idx}>Pincode {pincode}: {count} parcels</li>
            ))}
          </ul>

          <h3>Shortest Delivery Route</h3>
          <button onClick={fetchRoute}>Get Route</button>
          <ul>{route.map((stop, i) => <li key={i}>{stop}</li>)}</ul>
        </>
      )}

      {role === 'customer' && (
        <>
          <h3>Track Your Parcel</h3>
          <input
            type="text"
            placeholder="Enter Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <button onClick={handleTrack}>Track</button>
          {trackingResult && (
            <div>
              <p>Status: {trackingResult.status}</p>
              <p>Location: {trackingResult.location}</p>
            </div>
          )}
          <h3>Shortest Route</h3>
          <button onClick={fetchRoute}>Show Route</button>
          <ul>{route.map((stop, i) => <li key={i}>{stop}</li>)}</ul>
        </>
      )}

      {role === 'driver' && (
        <div>
          <h3>Driver Dashboard</h3>
          <p>You will see assigned deliveries here. (Placeholder)</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
