import React, { useState, useEffect } from 'react';
import MealItems from './Mealitems';
import RecipeIndex from './RecipeIndex';


const Meals = () => {
    const [search,setSearch]=useState("");
    const [show,setShow]=useState(false);
    const [item,setItem]=useState("");
    const [url,setUrl]=useState("https://www.themealdb.com/api/json/v1/1/search.php?f=a");

    useEffect(()=>{
        fetch(url).then(res=>res.json()).then(data=> {
            setItem(data.meals);
            setShow(true);
        })
     },[url])

     const searchRecipe=(e)=>{
        if(e.key === "Enter"){
            setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        }
         
    }
    const setIndex=(alpha)=>{
        setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alpha}`);
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800">Search Your Food Recipe</h1>
                <h4 className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
                    Discover amazing recipes from around the world with just a few clicks!
                </h4>
            </div>

            <div className="flex justify-center mb-8">
                <input 
                    type="search" 
                    placeholder="Search by ingredient or meal name..." 
                    className="w-80 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    onChange={(e) => setSearch(e.target.value)} 
                    value={search} 
                    onKeyDown={searchRecipe} 
                />
            </div>

            <div className="container mx-auto">
                {
                    show ? <MealItems data={item} /> : "Loading..."
                }
            </div>
            <div className="container mx-auto mt-5 mb-5 flex">
                 <RecipeIndex alphaIndex={(alpha)=>setIndex(alpha)}/>
            </div>
        </div>
    );
};

export default Meals;
