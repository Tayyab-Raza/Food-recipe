import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Components/Pages/Signup.Component";
import Login from "./Components/Pages/Login.Component";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from './context/userContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePage from "./Components/Pages/HomePage";
import axios from "axios";
import Dashboard from "./Components/Pages/Dashboard";
import RecipeGen from "./Components/Pages/RecipeGen";
import Recipe from "./Components/Pages/Recipe";
import RecipeInfo from "./Components/Pages/RecipeInfo";



axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    
    <UserContextProvider>
      <Router>
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/recipegen" element={<RecipeGen />} /> 
        <Route path="/recipe" element={<Recipe />} /> 
        <Route path="/:MealId" element={<RecipeInfo />} /> 
        </Routes>
      </Router>
      </UserContextProvider>
  );
}

export default App;
