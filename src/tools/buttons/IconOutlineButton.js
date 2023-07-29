import React from "react";

const IconOutlineButton = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`border-2 border-solid transition ease-in-out delay-150 bg-gray-200 font-bold border-[steelblue] px-2 py-2 rounded-lg hover:-translate-y-1 hover:scale-110 hover:border-indigo-500 duration-300 flex justify-between text-black items-center ${className}`}
    >
      <span className="mx-2">{children[0]}</span>
      <span className="mx-2">{children[1]}</span>
    </button>
  );
};

export default IconOutlineButton;
