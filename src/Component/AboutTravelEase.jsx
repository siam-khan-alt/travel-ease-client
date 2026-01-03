import React from "react";
import { Link } from "react-router-dom";

const AboutTravelEase = () => {
  return (
    <div className="bg-[#F4F1DE] dark:bg-[#1E293B] px-4 mx-auto container t-0.5
 md:pt-2.5 pb-5 dark:md:pb-12 md:pb-10">
      <div
        className=" text-[#1E293B] dark:text-[#F8FAFC] pb-5   transition duration-300">
        <h2 className="main-heading mt-2 mb-5 dark:my-5">
          Explore with{" "}
          <span className="text-[#F2CC8F] dark:text-[#E07A5F]">TravelEase</span>
        </h2>
        <p className="text-[#3D405B] dark:text-[#CBD5E1] mb-6">
          TravelEase is your ultimate travel companion, designed to make
          exploring the world easier and more enjoyable. With an extensive range
          of vehicles at your fingertips, you can effortlessly find the perfect
          ride for every journey—whether it's a weekend getaway, a business
          trip, or an adventurous road trip. Our platform combines comfort,
          convenience, and reliability to ensure every ride is seamless.
          Experience the freedom of choice, transparency in pricing, and a
          user-friendly booking process, all tailored to make your travels
          smooth and memorable. Travel with confidence, Travel with Ease.
        </p>
        <button className="btn-gradient max-w-[200px] mx-auto"><Link to="/allVehicles">
          Get Started</Link>
        </button>
      </div>
    </div>
  );
};

export default AboutTravelEase;
