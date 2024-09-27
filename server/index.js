const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const app = express();
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: 'https://reciperiver.netlify.app/', // Your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  credentials: true, // Allow cookies and other credentials
};

app.use(cors(corsOptions));

//Handle OPTIONS Request Manually 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin');
  res.header('Access-Control-Allow-Methods');
  res.header('Access-Control-Allow-Headers');
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Send a 200 response for OPTIONS
  }
  next();
});


//database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use("/", require("./routes/authRoutes"));



const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on ${port}`));
