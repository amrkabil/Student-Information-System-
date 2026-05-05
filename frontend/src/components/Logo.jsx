import React from 'react';

const Logo = ({ size = 40, showText = true, className = '' }) => (
  <div className={`logo-wrapper ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="logo-svg"
    >
      {/* Geometric Shield Icon */}
      <path 
        d="M50 10L15 25V50C15 70 50 90 50 90C50 90 85 70 85 50V25L50 10Z" 
        fill="#FF0000" 
      />
      {/* Minimalist Graduation Cap */}
      <path 
        d="M50 30L25 42L50 54L75 42L50 30Z" 
        fill="white" 
      />
      <path 
        d="M30 44V55L50 63V52L30 44Z" 
        fill="#EEEEEE" 
      />
      <path 
        d="M70 44V55L50 63V52L70 44Z" 
        fill="#DDDDDD" 
      />
      {/* Tassel */}
      <circle cx="75" cy="42" r="3" fill="white" />
      <path d="M75 42V55" stroke="white" strokeWidth="2" />
    </svg>

    {showText && (
      <span className="logo-text" style={{ 
        color: '#FFFFFF', 
        fontSize: `${size * 0.7}px`, 
        fontWeight: '900', 
        letterSpacing: '1px',
        fontFamily: "'Outfit', sans-serif",
        textTransform: 'uppercase'
      }}>
        SIS <span style={{ color: '#FF0000' }}>PORTAL</span>
      </span>
    )}

    <style jsx>{`
      .logo-wrapper {
        transition: all 0.3s ease;
        cursor: pointer;
      }
      .logo-wrapper:hover .logo-svg {
        transform: scale(1.05);
        filter: drop-shadow(0 0 8px rgba(255, 0, 0, 0.6));
      }
      .logo-wrapper:hover .logo-text {
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      }
    `}</style>
  </div>
);

export default Logo;
