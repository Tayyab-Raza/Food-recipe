const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const app = express();
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: 'https://reciperiver.netlify.app/',  // Replace with your Netlify URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials if needed (for cookies or authentication)
};

//database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use("/", require("./routes/authRoutes"));
app.use(cors(corsOptions));



const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on ${port}`));
