const express = require("express");
const { addLogin, getLogin } = require("../Controllers/loginController");

const router = express.Router();

router.post("/addLogin", addLogin);
router.post("/login", getLogin);

module.exports = {
  routes: router,
};
