const express = require("express");
const path = require("path");
const cors = require("cors");
const { User } = require("./models");
const { Coins } = require("./models");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { error, log } = require("console");
const bodyParser = require("body-parser");
const { sequelize } = require("sequelize");
const session = require("express-session");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./env" });

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

/**
 * Creating coin related logics
 */

/**
 * Login, signup routing related things
 */

const db = require("./models");

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "./public");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  if (req.session.email) {
    return res.json({ valid: true, email: req.session.email });
  } else {
    return res.json({ valid: false });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.json("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      req.session.email = user.email;
      // console.log(req.session.email);
      res.json("Success");
    } else {
      res.json("Invalid email or password");
    }
  } catch (error) {
    // console.error("Error during login:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/register", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "The name field is required." });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  try {
    const createdUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    req.session.email = createdUser.email;
    // console.log(req.session.email);

    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).json({ error: "A user with that email already exists." });
    } else {
      res
        .status(500)
        .json({ error: "An error occurred while creating the user." });
    }
  }
});

db.sequelize.sync().then((req) => {
  app.listen(5003, () => {
    console.log("server is running");
  });
});
