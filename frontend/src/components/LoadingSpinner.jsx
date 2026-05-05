import React from 'react';

const LoadingSpinner = () => (
  <div className="text-center" style={{ padding: '2rem' }}>
    <div className="loading-spinner"></div>
    <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Loading...</p>
  </div>
);

export default LoadingSpinner;
