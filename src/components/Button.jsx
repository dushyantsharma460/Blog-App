import React from 'react';

function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-500',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg font-medium transition duration-300 ease-in-out 
                  hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-blue-400 active:scale-95 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
