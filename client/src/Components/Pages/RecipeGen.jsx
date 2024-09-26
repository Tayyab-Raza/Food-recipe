import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar.Component";
import Footer from "../Footer/Footer";



const RecipeGen = () => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [complexity, setComplexity] = useState("");
  const [recipeText, setRecipeText] = useState("");
  const [recipeData, setRecipeData] = useState(null);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    if (recipeData) {
      // Initialize the event stream if recipeData is set
      initializeEventStream();
    }

    // Cleanup the event stream on component unmount
    return () => {
      closeEventStream();
    };
  }, [recipeData]);

  const initializeEventStream = () => {

    const recipeInputs = {...recipeData};
    // Construct query parameters
    const queryParams = new URLSearchParams(recipeInputs).toString();
    const url = `http://localhost:8000/recipegen?${queryParams}`;
    
    // Open SSE connection
    eventSourceRef.current = new EventSource(url);

    eventSourceRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      if (data.action === "close") {
        closeEventStream();
      } else if (data.action === "chunk") {
        setRecipeText((prev) => prev + data.chunk);
      }
    };

    eventSourceRef.current.onerror = () => {
      eventSourceRef.current.close();
    };
  };

  const closeEventStream = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  const handleSubmit = () => {
    // Collect form data and set it for SSE
    const recipeData = {
      ingredients,
      mealType,
      cuisine,
      cookingTime,
      complexity,
    };
    
    setRecipeText(""); // Clear previous recipe text
    setRecipeData(recipeData); // Trigger the event stream
    
  };

  return (
    <>
      <Navbar />
      <div className="w-[400px] border rounded-lg overflow-hidden shadow-lg mx-auto my-4 bg-gray-200">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Recipe Generator</div>

          {/* Ingredients Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredients">
              Ingredients
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ingredients"
              type="text"
              placeholder="Enter ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>

          {/* Meal Type Select */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mealType">
              Meal Type
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>

          {/* Cuisine Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cuisine">
              Cuisine Preference
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="cuisine"
              type="text"
              placeholder="e.g., Italian, Mexican"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            />
          </div>

          {/* Cooking Time Select */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cookingTime">
              Cooking Time
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="cookingTime"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
            >
              <option value="Less than 30 minutes">Less than 30 minutes</option>
              <option value="30-60 minutes">30-60 minutes</option>
              <option value="More than 1 hour">More than 1 hour</option>
            </select>
          </div>

          {/* Complexity Select */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="complexity">
              Complexity
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="complexity"
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="px-6 py-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              Generate Recipe
            </button>
          </div>

          {/* Recipe Output */}
          <div className="w-full h-[300px] text-xs text-gray-600 bg-white p-4 border rounded-lg shadow-xl whitespace-pre-line overflow-y-auto">
            {recipeText}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RecipeGen;
