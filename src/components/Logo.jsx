import React from 'react'

function Logo({ width = '100px', className = '' }) {
  return (
    <div className={`font-bold text-2xl ${className}`}>
      <span className="text-blue-600">D</span>
      <span className="text-gray-800">Blog</span>
    </div>
  )
}

export default Logo