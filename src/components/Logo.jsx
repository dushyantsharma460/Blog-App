import React from 'react';

function Logo({ width = '150px' }) {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
        <span className="text-white font-bold text-xl">D</span>
      </div>
      <span className="text-2xl font-bold text-gray-800">Dushyant Blog</span>
    </div>
  )
}

export default Logo;