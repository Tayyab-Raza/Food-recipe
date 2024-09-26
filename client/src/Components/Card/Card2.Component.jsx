import axios from "axios";
import React, { useState, useEffect } from "react";

const Card2 = () => {
  const details = [
    {
      id: 1,
      imgUrl: "images/card2.1.jpg",
      altr: "Chili Cheese Noodles",
      recipe: "Recipe",
      mealName: "Chili Cheese Noodles Recipe",
      info: " Craving for delicious street-style chili cheese noodles? Then Here’s a quick and super delicious noodle recipe, which can make for a perfect binge worthy meal. Especially, when you are craving for something spicy and cheesy. Made with veggies, chili, garlic and coriander, this dish has a perfect mix of taste and flavours. In fact, you can add a Korean touch by adding some sesame seeds. The addition of mozzarella, adds a punch of healthy proteins, which makes it super tasty. Loaded with the goodness of protein, fiber and essential nutrients, this dish has it all! You can pack this dish for office and school lunch or else you can serve it as a dinner for busy weekdays. So, try it today and nail this easy and delicious recipe.",
    },
    {
      id: 2,
      imgUrl: "images/card2.2.webp",
      altr: "Roti Pizza",
      recipe: "Recipe",
      mealName: "Roti Pizza Recipe",
      info: "Don't have pizza bases at home but want to make pizza? Can't order from home because it is too late? Don't worry we have a solution for you. This Roti Pizza will help you to try a new pizza recipe where you will not need pizza bases. You can use any type of pre-cooked roti or even rotis left from the previous day to make these delicious pizzas. This is a quick recipe for when you have guests over and can't think of making some delicious appetiser. You will just need pasta sauce, cheese, some vegetables and roti to make these pizzas. You can also make this pizza for your little ones and they won't even know that you have used roti as a base instead of actual pizza bases. If you want to avoid the heavy maida base of pizza that is available in the market, then you can easily give the pizza a healthier twist by using a whole wheat base in the form of roti. We have added some regular veggies here, however, you can customize the pizza by adding veggies of your choice. Do try this recipe, rate it and let us know how it turned out to be. (image:iStock)",
    },
    {
      id: 3,
      imgUrl: "images/card2.3.webp",
      altr: " Peanut Butter and Jam Sandwich",
      recipe: "Recipe",
      mealName: " Peanut Butter and Jam Sandwich Recipe",
      info: " Peanut Butter and Jam Sandwich is a classic recipe that you can make in just a couple of minutes. It is a no-cook recipe that even kids can prepare themselves. This sandwich recipe is super delicious and will satiate all your untimely cravings. You can prepare this recipe for breakfast on a busy morning or can make these sandwiches and take them on a road trip or a picnic. Also called PB&J sandwich, this delicious recipe will become an instant hit among kids and adults alike. You can have this sandwich as it is or grill it to make the bread slices crispy and crunchy. Do try this recipe, rate it and let us know how it turned out to be. (image credits- istock)",
    },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Ensure the request includes credentials (e.g., cookies) if needed
    axios
      .get("http://localhost:8000/verify", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching auth status:", err);
        setIsLoggedIn(false);
      });
  }, []);

  // State to manage expanded view for each card
  const [expandedCards, setExpandedCards] = useState({
    card: false,
  });

  // Function to toggle the state
  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative bg-gray-50 px-6 pb-20 lg:px-8 lg:pt-1 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 sm:h-2/3"></div>
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="pt-2">
          <p className="underline justify-start mt-1 max-w-2xl text-2xl font-bold text-black sm:mt-4">
            Snack Recipes
          </p>
        </div>
        <div className="mx-auto mt-5 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {/* Card */}
          {details.map((detail) => (
            <div
              className="card flex flex-col overflow-hidden rounded-lg shadow-lg self-start"
              key={detail.id}
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={detail.imgUrl}
                  alt={detail.altr}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <a
                      href={isLoggedIn ? "/recipe" : "/login"}
                      className="hover:underline"
                    >
                      {detail.recipe}
                    </a>
                  </p>
                  <div className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">
                      {detail.mealName}
                    </p>
                    <p
                      className={`mt-3 text-base text-gray-500 ${
                        expandedCards[detail.id] ? "" : "line-clamp-3"
                      }`}
                    >
                      {detail.info}
                    </p>
                    <button
                      className="pt-5 underline font-sans"
                      onClick={() => toggleExpand(detail.id)}
                    >
                      {expandedCards[detail.id] ? "Read Less" : "Read More"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card2;
