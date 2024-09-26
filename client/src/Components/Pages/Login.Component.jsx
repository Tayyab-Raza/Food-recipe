import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar.Component";
import loginbg from '../images/loginbg.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    const {email, password} = data;
    try {
      const {data} = await axios.post("/login", {
        email,
        password,
      });
      
      if(data.error) {
        toast.error(data.error)
      } else {
        setData({});
        toast.success("Login Successful, Welcome!");
        navigate("/recipe");
      }
    } catch (error) {
      console.error('Login error:', error);
    toast.error('An error occurred during login.');
    }
    
  };
  return (
    <>
    <div style={{
      backgroundImage: `url(${loginbg})`,
      backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh'
    }} className="flex flex-col min-h-screen">
    <Navbar />
      <section >
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen sm:h-screen lg:py-0 mt-[100px]">
          <div class="login w-full bg-transparent backdrop-blur-md rounded-lg shadow dark:border md:mt-0 sm:mx-auto sm:w-full sm:max-w-md xl:p-0 dark:bg-transparent dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                class="space-y-4 md:space-y-6"
                onSubmit={handleForm}
              >
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    id="email"
                    class="bg-transparent text-white border border-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Password
                  </label>
                  <div className="border flex border-white text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600   dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <input
                      name="password"
                      id="password"
                      value={data.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      class="bg-transparent text-white block w-full p-2 dark:bg-transparent dark:placeholder-gray-400 dark:text-white"
                      required=""
                    />
                    <div
                      className="p-2 mt-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 border text-white border-gray-300 bg-transparent rounded focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="remember"
                        class="text-white dark:text-white"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    class="text-sm font-medium text-gray-300 hover:underline dark:text-gray-300"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Log in
                </button>
                <p class="text-sm font-light text-white dark:text-white">
                  Don’t have an account yet?{" "}
                  <a
                    href="/signup"
                    class="font-medium text-white hover:underline dark:text-gray-300"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Login;
