import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  ...props
}, ref) {
  const id = useId();
  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        ref={ref}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg transition 
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                    ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
