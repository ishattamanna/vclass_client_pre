import React from "react";

const TextArea = ({
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
    <textarea
      className={`textarea textarea-bordered bg-blue-200 border-2 font-bold border-[steelblue] ${className}`}
      onChange={onChange}
      onKeyDown={onKeyDown}
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      required={required}
    ></textarea>
  );
};

export default TextArea;
