const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helper/auth");
const jwt = require("jsonwebtoken");
// const cookie = require("cookie-parser");

const test = (req, res) => {
  res.json({
    message: "Welcome",
  });
};

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // user name
    if (!name) {
      return res.json({
        error: "enter the name",
      });
    }

    // password

    if (!password) {
      return res.json({
        error: "enter the password",
      });
    }

    //Email

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "User already exist",
      });
    }

    const hasedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hasedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.json({
        error: "Fill the feild",
      });
    } else {
      const user = await User.findOne({ email });

      if (!user) {
        return res.json({
          error: "No user Found",
        });
      }

      const match = await comparePassword(password, user.password);
      if (match) {
        jwt.sign(
          { email: user.email, name: user.name, id: user._id },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) {
              throw err;
            }
            res.cookie("token", token).json(user);
          }
        );
      }
      if (!match) {
        return res.json({
          error: "password do not match",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const userProfile = (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        throw err;
      }
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = { test, userRegister, userLogin, userProfile };
