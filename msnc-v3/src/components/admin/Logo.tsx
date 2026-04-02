import React from 'react';

export const Logo = () => (
  <div className="msnc-logo-wrapper" style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px',
    padding: '8px 0'
  }}>
    <div style={{ 
      width: '36px', 
      height: '36px', 
      backgroundColor: '#002147', 
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '900',
      fontSize: '20px',
      boxShadow: '0 4px 12px rgba(0, 33, 71, 0.2)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      M
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ 
        fontWeight: '900', 
        letterSpacing: '-0.03em', 
        color: '#f8fafc',
        fontSize: '18px',
        lineHeight: '1'
      }}>
        MSNC <span style={{ color: '#0369a1' }}>v3</span>
      </span>
      <span style={{ 
        fontSize: '9px', 
        textTransform: 'uppercase', 
        letterSpacing: '0.2em', 
        fontWeight: '800',
        color: 'rgba(255,255,255,0.4)',
        marginTop: '4px'
      }}>
        Executive Board
      </span>
    </div>
  </div>
);