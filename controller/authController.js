const { where } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const createError = require("../utils/appError");   

// const Users = db.users;
const Users = db.users;

// Register User
const signup = async (req, res, next) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (user) {
      return next(new createError("User Already Exists!", 400));
    }
    const hashPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await Users.create({
      ...req.body,
      password: hashPassword,
    });

    //Assign JWT Token
    const token = jwt.sign({ id: newUser.id }, "secretkey123", {
      expiresIn: "90d",
    });

    res.status(201).json({
      status: "success",
      message: "User registered succesfully",
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Login User
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) return next(new createError("User not Found", 404));

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new createError("Invalid email or password", 401));
    }

    const token = jwt.sign({ id: user.id }, "secretkey123", {
      expiresIn: "90d",
    });

    res.status(200).json({
      status: "succces",
      token,
      message: "Logged in Succesfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  login,
};
