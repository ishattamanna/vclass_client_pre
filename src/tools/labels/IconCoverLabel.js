import React from "react";

const IconCoverLabel = ({ className, children, onClick, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      onClick={onClick}
      className={`bg-[steelblue] text-white font-bold p-2 rounded-full cursor-pointer ${className}`}
    >
      {children}
    </label>
  );
};

export default IconCoverLabel;
