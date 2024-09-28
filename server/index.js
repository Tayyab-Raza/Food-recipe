const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const app = express();
const cookieParser = require('cookie-parser');

app.use(cors({
  origin: 'https://reciperiver.netlify.app',
  credentials: true, // Allow credentials (e.g., cookies) if needed
}));


//database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use("/", require("./routes/authRoutes"));
app.options('*', cors());



const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on ${port}`));
