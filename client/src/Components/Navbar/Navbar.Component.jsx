import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Ensure the request includes credentials (e.g., cookies) if needed
    axios.get("http://localhost:8000/verify", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(err => {
        console.error('Error fetching auth status:', err);
        setIsLoggedIn(false);
      });

  }, []);

  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

  const handleLogout = () => {
    axios.get("http://localhost:8000/logout",  { withCredentials: true })
    .then((res) => {
      if(res.data.Status === "Success"){
        window.location.reload(true);
      }else {
        alert("error")
      }
    }).catch(err => console.log(err))
  }

  return (
    <nav className="top-0 z-10 block w-full max-w-full px-4 py-2 text-black bg-slate-100 border-none focus:outline-none rounded-none shadow-md h-max bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="justify-start flex items-start gap-1">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <a
            href="/"
            className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
          >
            Food Recipe
          </a>
        </div>
        <div className="flex items-center gap-2">
          {isMenuOpen ? (
            <div className="hidden" />
          ) : (
            <div className="mr-4 w-full flex items-center gap-3 bg-white px-3 py-1 rounded-md">
              <BiSearch />
              <input
                type="text"
                id="text"
                placeholder="Search recipe"
                className="w-full bg-transparent border-none focus:outline-none"
              />
            </div>
          )}
          <div className="flex items-center gap-x-1">
            {isLoggedIn ? (
              <>
                <a
                href="/"
                className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
              >
                Home
              </a>
              <a
                href="/recipe"
                className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
              >
                Recipe
              </a>
              <a
                href="/dashboard"
                className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
              >
                Dashboard
              </a>
              <button
              className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
              type="button"
              onClick={handleLogout}
            >
              Log Out
            </button>
            </>
            ) : (
              <>
              <button
                className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button"
              >
                <a href="/login">Generate Recipe</a>
              </button>
              <button
                className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button"
              >
                <a href="/login">Log In</a>
              </button>
              <button
                className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button"
              >
                <a href="/signup">Sign Up</a>
              </button>
              </>
                )}
          </div>
          


          {/* Hamburger Button */}
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <AiOutlineClose className="w-6 h-6" />
            ) : (
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </span>
            )}
          </button>
        </div>

        {/* Display login, signup, and dashboard buttons on small screens */}
        <div
          className={`lg:flex items-center gap-2 ${
            isMenuOpen ? "flex" : "hidden"
          } lg:hidden`}
        >
          {isLoggedIn && (
            <>
             <a
             href="/"
             className="px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
           >
             Home
           </a>
             <a
             href="/recipe"
             className="px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
           >
             Recipe
           </a>
            <a
              href="/dashboard"
              className="px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
            >
              Dashboard
            </a>
            </>
          )}
          {!isLoggedIn ? (
            <>
              <a
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
              >
                Log In
              </a>
              <a
                href="/signup"
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-tr from-gray-900 to-gray-800 rounded-lg hover:opacity-80 transition-all"
              >
                Sign Up
              </a>
            </>
          ) : (
            <a
              href="/"
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-tr from-gray-900 to-gray-800 rounded-lg hover:opacity-80 transition-all"
            onClick={handleLogout}
            >
              Log Out
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
