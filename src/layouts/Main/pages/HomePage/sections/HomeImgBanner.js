import React from "react";
import homeBannerImg from "../../../../../assets/home_images/Homepage.png";
import Button from "../../../../../tools/buttons/Button";
import OutlineButton from "../../../../../tools/buttons/OutlineButton";
import IconCoverButton from "../../../../../tools/buttons/IconCoverButton";
import ArrowDownIcon from "../../../../../tools/icons/ArrowDownIcon";

const HomeImgBanner = () => {
  return (
    <section className="">
      <div className="bg-[#179275] text-white">
        <div className="container flex flex-col items-center px-4 py-5 pb-24 mx-auto text-center lg:pb-32 md:py-10 md:px-10 lg:px-32">
          <h1 className="lg:text-5xl text-2xl font-bold leadi sm:text-6xl xl:max-w-3xl">Welcome to VClass</h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl font-semibold">Join us on the way to success!</p>
        </div>
      </div>
      <img src={homeBannerImg} alt="" className="w-5/6 h-[60vh] mx-auto mb-12 -mt-20 rounded-lg shadow-md lg:-mt-40 bg-gray-500" />
    </section>
  );
};

export default HomeImgBanner;
