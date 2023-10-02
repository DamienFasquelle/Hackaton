const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const authControllers = require("../controllers/authControllers");
const { userModel } = require("../Db/sequelize");

router.route("/signin").post(authControllers.signIn);
router.route("/login").post(authControllers.login);

router.route("/").get(userControllers.findAllUsers);

router
  .route("/:id")
  .put(
    authControllers.protect,
    authControllers.restrictToOwnUser(userModel),
    userControllers.updatePassword
  )
  .get(userControllers.findUserById);

module.exports = router;
