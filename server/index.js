const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const app = express();
const cookieParser = require('cookie-parser');


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
