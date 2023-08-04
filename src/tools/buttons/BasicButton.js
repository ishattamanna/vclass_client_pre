import React from "react";

const BasicButton = ({ className, onClick, children, type, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`bg-[#179275] text-white font-bold px-5 py-2 rounded-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default BasicButton;
