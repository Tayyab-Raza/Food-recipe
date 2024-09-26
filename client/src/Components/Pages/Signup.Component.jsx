import { useState } from "react";
import React from "react";
import Login from "./Login.Component";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar.Component";
import signupbg from "../images/signupbg.jpg";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSwitchToLogin = () => {
    setShowLogin(true);
  };

  const handleSwitchToSignup = () => {
    setShowLogin(false);
  };
  const handleform = async (e) => {
    e.preventDefault();
    const { name, email, password, confpassword } = data;
    try {
      const { data } = await axios.post("/signup", {
        name,
        email,
        password,
        confpassword,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("SignUp Successful, Welcome!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div style={{
      backgroundImage: `url(${signupbg})`,
      backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh'
    }} className="flex flex-col min-h-screen">
    <Navbar />
      {showLogin ? (
        <Login switchToSignup={handleSwitchToSignup} />
      ) : (
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen sm:h-screen lg:py-0 mt-[100px]">
            <div class="signup w-full bg-transparent backdrop-blur-md rounded-lg shadow dark:border md:mt-0 sm:mx-auto sm:w-full sm:max-w-md xl:p-0 dark:bg-transparent dark:border-gray-700 ">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center ">
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="text-center lg:text-3xl leading-9 lg:font-extrabold text-white text-xl font-bold">
              Create a new account
            </h2>
            <p class="mt-2 text-center text-sm leading-5 text-white max-w">
              Or <br />
              <a
                href="/login"
                onClick={handleSwitchToLogin}
                class="font-bold lg:text-xl text-lg border-black text-white hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150 hover:underline"
              >
                Login
              </a>
            </p>
          </div>
              <form onSubmit={handleform}>
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium leading-5  text-white"
                  >
                    UserName
                  </label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="name"
                      name="username"
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      placeholder="John Doe"
                      type="text"
                      required=""
                      class="appearance-none text-white block bg-transparent w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                    <div class="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        class="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="mt-6">
                  <label
                    for="email"
                    class="block text-sm font-medium leading-5 text-white"
                  >
                    Email address
                  </label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="email"
                      name="email"
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      placeholder="user@example.com"
                      type="email"
                      required=""
                      class="appearance-none text-white block bg-transparent w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                    <div class="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        class="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="mt-6">
                  <label
                    for="password"
                    class="block text-sm font-medium leading-5 text-white"
                  >
                    Password
                  </label>
                  <div class="mt-1 rounded-md shadow-sm flex  border border-gray-300  placeholder-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                    <input
                      id="password"
                      name="password"
                      value={data.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      type={showPassword ? "text" : "password"}
                      required=""
                      className="appearance-none text-white block w-full px-3 py-2 rounded-md bg-transparent"
                    />
                    <div
                      className="p-2 mt-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                </div>

                <div class="mt-6">
                  <label
                    for="password_confirmation"
                    class="block text-sm font-medium leading-5 text-white"
                  >
                    Confirm Password
                  </label>
                  <div class="mt-1 rounded-md flex shadow-sm border border-gray-300  placeholder-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                    <input
                      id="password_confirmation"
                      name="password_confirmation"
                      value={data.confpassword}
                      onChange={(e) =>
                        setData({ ...data, confpassword: e.target.value })
                      }
                      type={showConfirmPassword ? "text" : "password"}
                      required=""
                      class="appearance-none text-white block w-full px-3 py-2 rounded-md bg-transparent"
                    />
                    <div
                      className="p-2 mt-1"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                </div>

                <div class="mt-6">
                  <span class="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      class="w-full flex justify-center py-2 px-4 border border-gray-500 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      {" "}
                      SignUp
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Signup;
