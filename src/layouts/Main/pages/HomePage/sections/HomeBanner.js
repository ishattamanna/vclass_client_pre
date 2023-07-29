import React from "react";
import bannerImg from "../../../../../assets/home_images/virtual-classroom-distance-learning-cartoon_82574-2928-removebg-preview.png";
import HomeStat from "./HomeStat";

const HomeBanner = () => {
  return (
    <div id="schrollHere" className="card lg:card-side bg-base-100 shadow-xl mb-5">
      <figure className="lg:w-2-[40%]">
        <img src={bannerImg} alt="bannerImg" />
      </figure>
      <div className="card-body lg:w-[60%] text-start">
        <h2 className="card-title">New album is released!</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
          fugit blanditiis sequi at consectetur eos molestias reiciendis tempora
          facere expedita ad qui suscipit beatae dignissimos eveniet dicta
          asperiores aspernatur quae animi reprehenderit eius aut quo, incidunt
          magnam! Culpa alias nam soluta repellat illum, maiores commodi aliquam
          totam recusandae cumque quos?
        </p>
        <div>
          <HomeStat />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
