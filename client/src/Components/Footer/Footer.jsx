import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedin, FaEarthAsia } from "react-icons/fa6";

const Footer = () => {
  const Navigate = useNavigate();

  return (
    <footer className="card2 text-black bg-gray-200 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div>
          <h3 className="font-bold mb-4 ml-5">Get In Touch</h3>
          <div className="flex items-start mb-2">
            <FiMapPin className="h-5 w-5 text-yellow-400 mr-2" />
            <div>
              <p>Plot No. 37/Part S.No376/A</p>
              <p>2nd Floor, Gomti Nagar - 500072</p>
              <p>Lucknow, India</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-4">Customer Service</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Help & FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Live Chat Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Recipe Query Forum/Community Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Email Support for Personalized Assistance
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Recipe Feedback and Troubleshooting Section
              </a>
            </li>
            <li>
              <a href="/login" className="hover:underline">
                Login
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">About Us</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Our Story
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Meet the Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Corporate Sales
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Our Recipe Philosophy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Popular categories</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Quick & Easy Recipes
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Healthy & Nutritious
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Vegetarian & Vegan
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Global Cuisines
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Desserts & Sweets
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Family-Friendly Meals
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Gluten-Free Recipes
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Budget-Friendly Meals
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Low-Carb & Keto
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Comfort Food Classics
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Newsletter</h3>
          <p className="mb-4">
            Get all the latest information on Meals and Offers.
          </p>
          <div className="flex mb-4">
            <input
              type="email"
              placeholder="Your Email Address"
              className="mr-2 text-black"
            />
            <button
              className="bg-yellow-500 text-white"
              onClick={() => {
                Navigate("/signup");
              }}
            >
              Sign Up
            </button>
          </div>
          <h4 className="font-bold mb-2">Follow Us</h4>
          <div className="flex space-x-2">
            <a href="https://www.linkedin.com/in/tayyab-raza-5b2909244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
              <FaLinkedin className="w-8 h-8 text-yellow-400 cursor-pointer" />
            </a>
            <a href="https://www.instagram.com/its___raza_/?igsh=MWp6ZzJ2OXpkcG1uOQ%3D%3D" target="_blank">
              <BsInstagram className="w-8 h-8 text-yellow-400 cursor-pointer" />
            </a>

            <a href="https://github.com/Tayyab-Raza" target="_blank">
              <FaGithub className="w-8 h-8 text-yellow-400 cursor-pointer" />
            </a>

            <a href="https://tayyab-raza.github.io/Personal-Portfolio/" target="_blank">
              <FaEarthAsia className="w-8 h-8 text-yellow-400 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
