import React from "react";

const IconButton = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[steelblue] flex justify-between text-white transition ease-in-out delay-150 font-bold px-2 py-2 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 items-center rounded-lg ${className}`}
    >
      <span className="mx-2">{children[0]}</span>
      <span className="mx-2">{children[1]}</span>
    </button>
  );
};

export default IconButton;
