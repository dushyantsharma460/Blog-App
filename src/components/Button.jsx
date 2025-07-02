import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button 
            type={type}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${bgColor} ${textColor} ${className} hover:${bgColor.replace('bg-', 'bg-').replace('-600', '-700')}`}
            {...props}
        >
            {children}
        </button>
    );
}