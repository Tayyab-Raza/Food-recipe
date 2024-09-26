import React from "react";
import HeroSlider from "react-slick";

import food1 from '../images/food1.jpg'
import food2 from '../images/food2.jpg'
import food3 from '../images/food3.jpg'

const Slider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div className="slider-container mx-auto py-10 relative">
    <HeroSlider {...settings}>
      <div className="flex items-center justify-center px-4">
        <img
          className="w-full h-[150px] lg:h-[400px] object-cover rounded-lg"
          src={food1}
          alt="Food 1"
        />
      </div>
      <div className="flex items-center justify-center px-4">
        <img
          className="w-full h-[150px] lg:h-[400px] object-cover rounded-lg"
          src={food2}
          alt="Food 2"
        />
      </div>
      <div className="flex items-center justify-center px-4">
        <img
          className="w-full h-[150px] lg:h-[400px] object-cover rounded-lg"
          src={food3}
          alt="Food 3"
        />
      </div>
    </HeroSlider>
  </div>
  );
};

export default Slider;
