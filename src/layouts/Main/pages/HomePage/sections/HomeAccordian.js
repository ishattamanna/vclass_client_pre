import React from "react";

const HomeAccordian = () => {
  return (
    <div className="join join-vertical w-full">
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" checked="checked" />
        <div className="collapse-title text-xl font-medium bg-[steelblue] text-white">
          Click to open this one and close others
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium bg-[steelblue] text-white">
          Click to open this one and close others
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium bg-[steelblue] text-white">
          Click to open this one and close others
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
    </div>
  );
};

export default HomeAccordian;
