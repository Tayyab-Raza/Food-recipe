import React from "react";
import Meals from "./Meals";
import MealItems from "./Mealitems";


const RecipeIndex = ({alphaIndex}) => {
  const alpha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "J",
    "I",
    "J",
    "k",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let num = 0;

  return (
    <>
      {alpha.map((item) => {
        return (
          <div
            className="lg:w-full lg:h-10 w-full h-4 text-sm rounded-full flex justify-center items-center bg-black text-white mx-1 cursor-pointer"
            key={num++}
            onClick={() => alphaIndex(item)}
          >
            <h3>{item}</h3>

          </div>
        );
      })}
    </>
  );
};

export default RecipeIndex;
