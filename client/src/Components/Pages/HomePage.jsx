import React from "react";
import Slider from "../Slider/Slider.Component";
import Card1 from "../Card/Card1.Component";
import Card2 from "../Card/Card2.Component";
import Card3 from "../Card/Card3.Component";
import Navbar from "../Navbar/Navbar.Component";
import Footer from "../Footer/Footer";


const HomePage = () => {
  return (
    <>
    <Navbar />
      <div className="container text-center font-2xl font-bold font-sans flex justify-center items-center pt-10">
        <h1>Food Recipe from around the world!</h1>
      </div>
      <Slider />
      <div className="pt-12">
        <Card1 />
      </div>
        <Card2 />
        <Card3 />
        <Footer />
      
    </>
  );
};

export default HomePage;
