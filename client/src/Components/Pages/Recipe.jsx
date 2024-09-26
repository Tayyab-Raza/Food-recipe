import React from "react";
import Meals from "../Meals/Meals";
import Mealitems from "../Meals/Mealitems";
import Navbar from "../Navbar/Navbar.Component";
import Footer from "../Footer/Footer";


const Recipe = () => {
  return (
    <>
      <Navbar />
      <Meals />
      <Mealitems />
      <Footer />
    </>
  );
};

export default Recipe;
