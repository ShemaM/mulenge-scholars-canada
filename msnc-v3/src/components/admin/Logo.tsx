import React from 'react'

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <div
      className={`font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${className}`}
    >
      MSNC
    </div>
  )
}
