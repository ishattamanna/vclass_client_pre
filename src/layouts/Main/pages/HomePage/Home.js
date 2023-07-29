import React, { useRef } from "react";
import HomeBanner from "./sections/HomeBanner";
import HomeImgBanner from "./sections/HomeImgBanner";
import HomeAccordian from "./sections/HomeAccordian";

const Home = () => {

  const schrollRef = useRef()

  return (
    <div className="lg:px-20 px-2 py-5">
      <HomeImgBanner />
      <HomeBanner schrollRef={schrollRef} />
      <HomeAccordian />
    </div>
  );
};

export default Home;
