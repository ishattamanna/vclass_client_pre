import React from "react";

const HomeAccordian = () => {
  return (
    <div className="join join-vertical w-full">
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" checked="checked" />
        <div className="collapse-title text-xl font-medium bg-[steelblue] text-white">
        What are the key enhancements and updates that differentiate VClass from the traditional Google Classroom?
        </div>
        <div className="collapse-content font-semibold">
          <p>VClass offers several new features and functionalities designed to enhance the virtual learning experience for both educators and students.
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
        How does VClass improve communication and collaboration in the virtual classroom setting?

        </div>
        <div className="collapse-content font-semibold">
          <p>VClass introduces real-time chat and enables seamless interactions between teachers and students.
        </p>
        </div>
      </div>
    </div>
  );
};

export default HomeAccordian;
