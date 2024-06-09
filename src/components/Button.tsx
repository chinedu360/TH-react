import React from "react";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`border border-{#FFFF00} bg-[#FFFF00] hover:bg-gray-300 text-black font-bold py-2 px-4 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
