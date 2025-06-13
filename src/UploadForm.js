import React, { useState } from 'react';
import { uploadFile } from './api';

function UploadForm({ token }) {
  const [file, setFile] = useState(null);
  const [vendor, setVendor] = useState('');

  const handleUpload = async () => {
    if (!file || !vendor) return alert('Provide file and vendor');
    const formData = new FormData();
    formData.append('file', file);
    await uploadFile(vendor, formData, token);
    alert('Upload successful');
  };

  return (
    <div>
      <h3>Upload Orders</h3>
      <input type="text" placeholder="Vendor Name" onChange={(e) => setVendor(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadForm;