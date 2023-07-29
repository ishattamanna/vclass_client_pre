import React from "react";

const OutlineButton = ({ className, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`border-2 border-solid transition ease-in-out delay-150 bg-gray-200 font-bold border-[steelblue] px-5 py-2 rounded-lg hover:-translate-y-1 hover:scale-110 hover:border-indigo-500 duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
