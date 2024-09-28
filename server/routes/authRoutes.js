const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  signupUser,
  loginUser,
  getProfile,
  verifyUser,
  logoutUser,
  recipeGen
} = require("../controllers/authController");

router.use(cors({
  origin: 'https://reciperiver.netlify.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
  credentials: true
}));

router.get("/", test);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.get("/verify", verifyUser, (req, res) => {
  return res.json({Status: "Success"})
});
router.get("/logout", logoutUser, (req, res) => {
  return res.json({Status: "Success"})
});
router.get("/recipegen", recipeGen)

module.exports = router;
