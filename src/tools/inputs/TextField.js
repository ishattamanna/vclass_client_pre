import React from "react";

const TextField = ({
  type,
  placeholder,
  className,
  value,
  required,
  name,
  onChange,
  onKeyDown,
}) => {
  return (
    <input
      onChange={onChange}
      onKeyDown={onKeyDown}
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      required={required}
      className={`input input-bordered bg-blue-200 border-2 font-bold border-[steelblue]   ${className}`}
    />
  );
};

export default TextField;
