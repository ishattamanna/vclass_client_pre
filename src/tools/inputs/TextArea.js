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
  defaultValue,
}) => {
  return (
    <textarea
      className={`textarea textarea-bordered bg-green-200 border-2 font-bold border-[green] ${className}`}
      onChange={onChange}
      onKeyDown={onKeyDown}
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      defaultValue={defaultValue}
      required={required}
    ></textarea>
  );
};

export default TextArea;
