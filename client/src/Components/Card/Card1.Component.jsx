import React, { useState, useEffect } from "react";
import axios from "axios";

const Card1 = () => {
  const details = [
    {
      id: 1,
      imgUrl: "images/card1.webp",
      altr: "Creamy Mango Chia Pudding Recipe",
      recipe: "Recipe",
      mealName: "Creamy Mango Chia Pudding Recipe",
      info: "Yearning for a delightful and refreshing sweet treat? Then try this easy peasy sweet treat prepared with the goodnessof mangoes, coconut milk and protein-rich chia seeds. Thishealthy and tasty recipe can be prepared in just a few minutes that too without putting in much efforts, just combine, refrigerate and dig in! So, follow us through some simple steps and enjoy!",
    },
    {
      id: 2,
      imgUrl: "images/card2.webp",
      altr: "Nutella French Toast Recipe",
      recipe: "Recipe",
      mealName: "Nutella French Toast Recipe",
      info: "Nutella French Toast makes an ideal addition to school breakfasts/lunches with its irresistible combination of flavours. The creamy Nutella filling sandwiched between slices of golden French toast provides a delicious and satisfying treat that will surely bring joy to students. To prepare this delightful Nutella French Toast, start by whisking together milk, cornstarch, ground flaxseeds, baking powder, and vanilla in a shallow bowl. Melt butter in a pan over medium-high heat and whisk the batter again before dipping each side of the bread into it. Let the bread soak for about 10 seconds, then cook it in the pan for 2-3 minutes on each side until golden brown. Add more butter as needed between bread slices. Serve the scrumptious French Toast with a generous spread of Nutella and fresh fruit. For an extra treat, pair it with a refreshing berry smoothie. (Recipe courtesy: Chef Vikas Khanna)",
    },
    {
      id: 3,
      imgUrl: "images/card3.webp",
      altr: "Creamy Chicken Veggie Wrap Recipe",
      recipe: "Recipe",
      mealName: "Creamy Chicken Veggie Wrap Recipe",
      info: "Looking for a healthy and delicious breakfast delicacy, then try this easy Chicken Veggie Wrap, which can be made in just a few minutes with some easily available ingredients. Well, this easy recipe can also be prepared using leftover chicken chunks and any vegetable of choice, wrapped in the goodness of creamy homemade dip, this easy recipe can be packed for a quick lunch. So, without a further ado, try this easy recipe and enjoy!",
    },
  ];

  // State to manage expanded view for each card
  const [expandedCards, setExpandedCards] = useState({
    card: false,
  });

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

  // Function to toggle the state
  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 sm:h-2/3"></div>
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="lg:text-3xl font-bold tracking-tight text-gray-900 text-2xl">
            Learn, Cook, Eat and Repeat!
          </h2>
          <p className="mx-auto mt-3 max-w-2xl lg:text-xl text-sm text-gray-500 sm:mt-4">
            Here's something you would love!...
          </p>
        </div>
        <div className="pt-14">
          <p className="underline justify-start mt-7 max-w-2xl text-2xl font-bold text-black sm:mt-4">
            Breakfast Recipes
          </p>
        </div>
        <div className="mx-auto mt-5 grid max-w-lg gap-5 lg:max-w-none grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Card */}
          {details.map((detail) => (
            <div
              className="card flex flex-col overflow-hidden rounded-lg shadow-lg self-start"
              key={detail.id}
            >
              <div className="flex-1">
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

export default Card1;
