import React from "react";

const IconOutlineCoverButton = ({ className, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-green-200 text-black border-[green] border-2 border-solid font-bold p-2 rounded-full ${className}`}
    >
      {children}
    </button>
  );
};

export default IconOutlineCoverButton;
