import React from "react";

const HomeAccordian = () => {
  return (
    <div className="join join-vertical w-full">
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" checked="checked" />
        <div className="collapse-title text-xl font-medium bg-[steelblue] text-white">
        How does VClass improve communication and collaboration in the virtual classroom setting? 
        </div>
        <div className="collapse-content font-semibold">
          <p>VClass introduces real-time chat and enables seamless interactions between teachers and students. 
         </p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium bg-[steelblue] text-white">
        Can students access VClass on mobile devices?

        </div>
        <div className="collapse-content font-semibold">
          <p>Absolutely, VClass is optimized for mobile compatibility, allowing students to learn seamlessly on smartphones and tablets.
       </p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium bg-[steelblue] text-white">
        In what way will users communicate?

        </div>
        <div className="collapse-content font-semibold">
          <p>Through social connectivity, such as adding friends or finding them, people may communicate with one another. 
        </p>
        </div>
      </div>
    </div>
  );
};

export default HomeAccordian;
