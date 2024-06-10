import React, { ChangeEvent } from "react";

interface InputProps {
  type: string;
  placeholder?: string;
  name: string;
  value?: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  checked,
}) => {
  if (type === "checkbox") {
    return (
      <input
        name={name}
        type={type}
        checked={checked}
        onChange={onChange}
        className="mr-2"
        aria-label={name}
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
      aria-label={placeholder || name}
    />
  );
};

export default Input;
