const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  userRegister,
  userLogin,
  userProfile,
} = require("../controller/authController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", test);
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/profile", userProfile);

module.exports = router;
