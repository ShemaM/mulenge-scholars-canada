import React from 'react';
import { cn } from '@/lib/utils';

type IconProps = {
  className?: string;
};

export const Icon = ({ className }: IconProps) => (
  <img 
    src="/media/icon.png"
    alt="MSNC Icon"
    className={cn(className)}
    style={{ 
      width: '32px', 
      height: '32px', 
      borderRadius: '8px',
      objectFit: 'contain',
      boxShadow: '0 2px 8px rgba(3, 105, 161, 0.3)'
    }}
  />
);

// CRITICAL: Required for Payload 3.0 Import Map
export default Icon;
