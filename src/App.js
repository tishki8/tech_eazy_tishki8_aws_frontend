import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DeliveryOrders from './DeliveryOrders';
import ParcelSummary from './ParcelSummary';
import TrackingPage from './TrackingPage';
import RouteFinder from './RouteFinder';
import UploadForm from './UploadForm';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [role, setRole] = useState('');

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1 className="logo">📦 Parcel System</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/track">Track Parcel</Link>
            {role && <Link to="/dashboard">Dashboard</Link>}
          </div>

          <div className="role-selector">
            <label>Select Role: </label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">--Select--</option>
              <option value="admin">Admin</option>
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
              <option value="driver">Driver</option>
            </select>
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<h2>Welcome to the Parcel Management System</h2>} />
            <Route path="/track" element={<TrackingPage />} />

            <Route path="/dashboard" element={
              role === 'admin' ? (
                <>
                  <ParcelSummary role={role} />
                  <DeliveryOrders role={role} />
                  <RouteFinder role={role} />
                </>
              ) : role === 'vendor' ? (
                <>
                  <UploadForm role={role} />
                  <DeliveryOrders role={role} />
                </>
              ) : role === 'customer' ? (
                <>
                  <TrackingPage role={role} />
                  <RouteFinder role={role} />
                </>
              ) : role === 'driver' ? (
                <Dashboard role={role} />
              ) : (
                <h3>Please select a role to view the dashboard.</h3>
              )
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
