import React, { useId } from 'react';

function Select({
  options,
  label,
  className = '',
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
      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition duration-150 ease-in-out ${className}`}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
