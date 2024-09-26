import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeIndex from "./RecipeIndex";
import Meals from "./Meals";

const MealItems = ({ data }) => {
  console.log(data);

  const Navigate = useNavigate();

  return (
    <>
      {!data ? (
        ""
      ) : (
        <div className="relative bg-gray-50 px-6 pt-6 pb-10 lg:px-8 lg:pt-8 lg:pb-16 ">
          <div className="mx-auto mt-3 grid max-w-lg gap-5 lg:max-w-none grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Card */}
            {data.map((data) => (
              <div className="card flex flex-1 flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="flex-1">
                  <img
                    className="h-48 w-full object-cover"
                    src={data.strMealThumb}
                    alt={data.strMeal}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white p-6 text-gray-900">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      <button
                      key={data.idMeal}
                        onClick={() => {Navigate(`/${data.idMeal}`)}}
                        className="hover:underline"
                      >
                       Full Recipe!
                      </button>
                    </p>
                    <div className="mt-2 block">
                      <a
                        className="text-xl font-semibold text-gray-900"
                        aria-placeholder="Watch Video"
                      >
                        {data.strMeal}
                      </a>
                      <p
                        className="mt-3 text-base text-gray-500"
                      >
                        Some Ingredients are: {""}
                        {data.strIngredient1}, {data.strIngredient2}, {data.strIngredient3}, {data.strIngredient4}, {data.strIngredient5}, {data.strIngredient6}, {data.strIngredient7}, etc...
                      </p>
                      <div className="pt-4">
                      <a
                        className="pt-5 underline font-sans text-indigo-600"
                        href={data.strYoutube}
                        target="_blank"
                      >
                        Click here to watch video
                      </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MealItems;
