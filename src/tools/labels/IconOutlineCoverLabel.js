import React from "react";

const IconOutlineCoverLabel = ({ className, children, onClick, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      onClick={onClick}
      className={`bg-green-200 text-black border-[green] border-2 border-solid font-bold p-2 rounded-full ${className}`}
    >
      {children}
    </label>
  );
};

export default IconOutlineCoverLabel;
