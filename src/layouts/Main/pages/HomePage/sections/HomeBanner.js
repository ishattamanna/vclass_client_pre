import React from "react";
import bannerImg from "../../../../../assets/home_images/19245711_6101073-scaled.jpg";
import HomeStat from "./HomeStat";

const HomeBanner = () => {
  return (
    <div id="schrollHere" className="card lg:card-side bg-base-100 shadow-xl mb-5">
      <figure className="lg:w-2-[40%]">
        <img src={bannerImg} alt="bannerImg" />
      </figure>
      <div className="card-body lg:w-[60%] text-start font-semibold">
        <h2 className="card-title">Join VClass Today!</h2>
        <p>
        VClass is an all-in-one virtual classroom solution that brings the best of traditional education into the digital era. Our platform combines state-of-the-art features with user-friendly design to create a seamless and immersive learning experience for students and educators alike.
        </p>
        <div>
          <HomeStat />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
