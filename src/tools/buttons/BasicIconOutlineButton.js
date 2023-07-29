import React from "react";

const BasicIconOutlineButton = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`border-2 border-solid bg-gray-200 font-bold border-[steelblue] px-2 py-2 rounded-lg flex justify-between text-black items-center ${className}`}
    >
      <span className="mx-2">{children[0]}</span>
      <span className="mx-2">{children[1]}</span>
    </button>
  );
};

export default BasicIconOutlineButton;
