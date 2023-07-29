import React from "react";

const BasicIconButton = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[steelblue] flex justify-between text-white font-bold px-2 py-2 items-center rounded-lg ${className}`}
    >
      <span className="mx-2">{children[0]}</span>
      <span className="mx-2">{children[1]}</span>
    </button>
  );
};

export default BasicIconButton;
