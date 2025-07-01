import React, { useId } from 'react';

const Select = React.forwardRef(function Select(
  {
    options = [],
    label,
    className = '',
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-semibold text-green-800"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`w-full px-3 py-2 bg-white border-2 border-green-600 rounded-lg shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                    transition duration-150 ease-in-out ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
