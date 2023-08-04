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
  defaultValue,
  onBlur,
}) => {
  return (
    <input
      onBlur={onBlur}
      defaultValue={defaultValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      required={required}
      className={`input input-bordered bg-green-200 border-2 font-bold border-[green]   ${className}`}
    />
  );
};

export default TextField;
