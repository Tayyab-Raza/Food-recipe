const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const { Configuration, OpenAI } = require('openai');
let Stream;
(async () => {
  Stream = await import("openai/streaming.mjs");
})();


const test = (req, res) => {
  res.json("test is working");
};

//SignUp
const signupUser = async (req, res) => {
  try {
    const { name, email, password, confpassword } = req.body;

    //check if name was entered
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    //check if password was entered
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and should be 6 characters long",
      });
    }

    //check if confirm password was correct
    if (confpassword !== password) {
      return res.json({
        error: "password does not match",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "this email is taken already",
      });
    }

    const hashedPassword = await hashPassword(password);
    // Create user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found!",
      });
    }

    // check if password match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              maxAge: 90 * 24 * 60 * 60 * 1000,
              httpOnly: true,
              sameSite: "none",
              secure: true,
            })
            .json({ user });
        }
      );
    }
    if (!match) {
      res.json({
        error: "Passwords do not match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//Profile

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    return res.json({ Message: "Unauthorized" });
  }
};

//Verification

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "Login Please" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ Message: "Auth error" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};


//logout
const logoutUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    res.clearCookie("token");
    return res.json({ Status: "Success", Message: "Successfully logged out" });
  } else {
    return res.status(400).json({ Message: "No user is logged in" });
  }
};

//recipe generator

const recipeGen = (req, res) => {
  const ingredients = req.query.ingredients;
  const mealType = req.query.mealType;
  const cuisine = req.query.cuisine;
  const cookingTime = req.query.cookingTime;
  const complexity = req.query.complexity;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendEvent = (chunk) => {
    console.log(chunk);
    let chunkResponse;
    if (chunk.choices[0].finish_reason === "stop") {
      res.write(`data: ${JSON.stringify({ action: "close" })}\n\n`);
    } else {
      if (
        chunk.choices[0].delta.role && chunk.choices[0].delta.role === "assistant"
      ) {
        chunkResponse = {
          action: "start",
        };
      } else {
        chunkResponse = {
          action: "chunk",
          chunk: chunk.choices[0].delta.content,
        };
      }
      res.write(`data: ${JSON.stringify(chunkResponse)}\n\n`);
    }
  };

  const prompt = [ "Generate a recipe that incorporates the following details:",
    `[Ingredients: ${ingredients}]`,
    `[Meal Type: ${mealType}]`,
    `[Cuisine: ${cuisine}]`,
    `[Cooking Time: ${cookingTime}]`,
    `[Complexity: ${complexity}]`,
    "Please provide a detailed recipe including steps for preparation and cooking, only using the ingredients mentioned.",
    "The recipe should highlight the fresh and vibrant flavors of the ingredients.",
    "Also, give the recipe a suitable name in its local language based on cuisine preference."
  ];

  const messages = [
    {
      role: "system",
      content: prompt.join(" "),
    },
  ];

  fetchOpenAICompletionsStream(messages, sendEvent);
  req.on("close", () => {
    res.end();
  });
};

async function fetchOpenAICompletionsStream(message, callback) {

  const OPENAI_API_KEY = process.env.API_KEY;

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
  const aiModel = "gpt-3.5-turbo";

  try {
    const completion = await openai.chat.completions.create({
      model: aiModel,
      messages: message,
      stream: true,
      max_tokens: 2048,
      temperature: 1,
    });

    for await (const chunk of completion) {
      callback(chunk);
    }
  } catch (error) {
    console.error("Error in OpenAI stream:", error);
    if (error.code === 'insufficient_quota') {
      callback({ action: "close", error: "Quota exceeded. Please try again later." });
    } else {
      callback({ action: "close", error: "Failed to generate recipe" });
    }
  }
}


module.exports = {
  test,
  signupUser,
  loginUser,
  getProfile,
  verifyUser,
  logoutUser,
  recipeGen,
};
