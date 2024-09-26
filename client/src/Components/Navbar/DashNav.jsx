import React, { useState, useEffect } from "react";
import { BiSearch, BiPlus } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashNav = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8000/logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/");
        } else {
          alert("error");
        }
      })
      .catch((err) => {
        console.error("Logout error:", err);
        alert("An error occurred during logout.");
      });
  };
  const handleswitch = () => {
    navigate("/recipegen");
  };

  return (
    <nav
      className={`flex items-center justify-between p-4 bg-slate-100 text-black shadow-md h-max bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 ${
        isMobile ? "flex-col" : "flex-row"
      }`}
    >
      <div className="justify-start flex items-start gap-1">
        <img src="/logo.png" alt="" className="w-10 h-10" />
        <div class="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
          Food Recipe
        </div>
      </div>

      {!isMobile && (
        <div className="flex items-center space-x-4 flex-1 mx-4 gap-3">
          <div className="relative flex-1 mx-52">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="text-xl">
                <BiSearch />
              </span>
            </button>
          </div>
          <div className="mr-5">
            <a
              href="/"
              className="hover:text-gray-300 hover:underline font-sans text-base font-medium text-inherit"
            >
              Home
            </a>
          </div>
          <div className="hover:text-gray-900 py-2 px-2 rounded-lg hover:underline font-sans text-base font-medium text-inherit ml-5">
            <a href="/recipe" id="btn" className="flex">
              Recipe
            </a>
          </div>
          <div className="hover:text-gray-900 bg-gray-300 py-2 px-2 rounded-lg hover:underline font-sans text-base font-medium text-inherit ml-5">
            <button
              type="submit"
              id="btn"
              className="flex"
              onClick={handleswitch}
            >
              Generate Recipe
            </button>
          </div>
          <button
            className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
            type="button"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}

      {isMobile && (
        <div className="items-center w-full mt-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="text-xl">
                <BiSearch />
              </span>
            </button>
          </div>
          <div className="flex my-5 mx-3 items-center gap-3">
            <div className="mx-1 my-3">
              <a
                href="/"
                className="hover:text-gray-300 hover:underline font-sans text-base text-inherit"
              >
                Home
              </a>
            </div>
            <div className="hover:text-gray-900 bg-gray-300 py-2 px-2 rounded-lg hover:underline font-sans text-base font-medium text-inherit ml-5">
              <a href="/recipe" id="btn" className="flex">
                Recipe
              </a>
            </div>
            <div className="hover:text-gray-900 py-2 px-1 rounded-lg hover:underline font-sans text-base text-inherit ml-2">
              <button
                type="submit"
                id="btn"
                className="flex"
                onClick={handleswitch}
              >
                Generate Recipe
              </button>
            </div>
            <button
              className="md:w-auto md:h-auto md:py-2 md:px-2 select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
              type="button"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashNav;
