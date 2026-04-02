import React from 'react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => (
  <div className={cn("msnc-logo-wrapper flex items-center gap-3 py-2", className)}>
    <img 
      src="/media/logo.png"
      alt="MSNC Logo"
      style={{ 
        width: '36px', 
        height: '36px', 
        borderRadius: '10px',
        objectFit: 'contain',
        boxShadow: '0 4px 12px rgba(0, 33, 71, 0.2)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    />
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

// CRITICAL: Payload 3.0 requires this for the Admin Dashboard
export default Logo;
