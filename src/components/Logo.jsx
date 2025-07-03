import React from 'react'

function Logo({ width = '100px', className = '', variant = '' }) {
  const isFooter = variant === 'footer'

  return (
    <div className={`font-bold text-2xl ${className}`} style={{ width }}>
      <span className="text-blue-600">D</span>
      <span className={isFooter ? 'text-white' : 'text-gray-800'}>Blog</span>
    </div>
  )
}

export default Logo
