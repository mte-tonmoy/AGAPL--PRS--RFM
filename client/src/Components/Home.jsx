import React from "react";
import Lottie from "lottie-react";
import MovingComponent from "react-moving-text";
import Animation from "../assets/animation.json";

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col lg:flex-row-reverse items-center">
          <Lottie
            animationData={Animation}
            loop={true}
            className="max-w-xs lg:max-w-sm"
          />
          <div className="text-center lg:text-left lg:ml-8">
            <MovingComponent
              type="fadeInFromLeft"
              duration="3000ms"
              delay="0s"
              direction="normal"
              timing="ease"
              iteration="1"
              fillMode="none"
              className="text-3xl lg:text-4xl font-bold leading-9 tracking-wide text-gray-800"
            >
              <span className="text-lime-500">Product </span>
              <span className="text-sky-500"> Requisition </span>
              <span className="text-pink-500"> System</span>
            </MovingComponent>
            <p className="py-4 lg:py-6 text-justify text-gray-600 font-serif max-w-lg">
              Welcome to Product Requisition System, your streamlined solution
              for managing product requisitions with ease. Our user-friendly
              platform empowers your team to request, approve, and track all
              necessary items efficiently. Say goodbye to outdated paperwork and
              endless email chains.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
