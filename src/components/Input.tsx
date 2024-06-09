import React from "react";

const Input = ({ type, placeholder, name, value, onChange, checked }) => {
  if (type === "checkbox") {
    return (
      <input
        name={name}
        type={type}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
    );
  }

  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
    />
  );
};

export default Input;
