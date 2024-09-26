import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar.Component";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";


const RecipeInfo = () => {
  const { MealId } = useParams();
  const [item, setItem] = useState();

  useEffect(() => {
    if (MealId) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`)
        .then((res) => res.json())
        .then((data) => {
          setItem(data.meals[0]);
        })
        .catch((error) => {
          console.error("Error fetching the meal data: ", error);
        });
    }
  }, [MealId]); 

  const getIngredients = () => {
    let ingredients = [];
    if (item) {
      for (let i = 1; i <= 20; i++) {
        if (item[`strIngredient${i}`]) {
          ingredients.push(
            `${item[`strIngredient${i}`]} - ${item[`strMeasure${i}`]}`
          );
        }
      }
    }
    return ingredients;
}

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-10">
        <div className="text-center mb-3">
          <h1 className="text-4xl font-bold text-black">
            Find Your Food Recipe here!
          </h1>
          <h4 className="text-lg text-black mt-4 max-w-xl mx-auto">
            Read, Cook, Eat and Repeat!
          </h4>
          </div>
        {!item ? (
          <p className="text-center text-black font-bold">Loading...</p>
        ) : (
          <>
            <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg p-8 my-10 ">
              {/* Meal Name */}
              <h1 className="text-4xl font-bold text-black mb-12 text-center">
                {item.strMeal}
              </h1>
              {/* Meal Image */}
              <div className="flex justify-center">
                <img
                  src={item.strMealThumb}
                  alt={item.strMeal}
                  className="rounded-lg shadow-lg w-full max-w-md mb-6"
                />
              </div>

              {/* Meal Area and Category */}
              <div className="flex justify-between text-black mb-4">
                <p className="text-xl">
                  <span className="font-semibold">Area:</span> {item.strArea}
                </p>
                <p className="text-xl">
                  <span className="font-semibold">Category:</span>{" "}
                  {item.strCategory}
                </p>
              </div>
              {/* Meal Instructions */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-black mb-2">
                  Instructions
                </h2>
                <p className="text-black leading-relaxed">
                  {item.strInstructions}
                </p>
              </div>

              {/* Meal Ingredients */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-black mb-2">
                  Ingredients
                </h2>
                <ul className="list-disc list-inside text-black">
                  {getIngredients().map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              {/* YouTube Video */}
              {item.strYoutube && (
                <div className="text-center mt-8">
                  <a
                    href={item.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full"
                  >
                    Watch Recipe Video on YouTube
                  </a>
                </div>
              )}
            </div>
          </>
        )}
      
      </div>
      <Footer />
    </>
  );
};

export default RecipeInfo;
