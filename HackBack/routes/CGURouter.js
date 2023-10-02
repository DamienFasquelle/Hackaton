const express = require("express");
const router = express.Router();
const CGUControllers = require("../controllers/CGUControllers");
const authControllers = require("../controllers/authControllers");

router
  .route("/")
  .get(CGUControllers.findCGU)
  // .post(
  //   authControllers.protect,
  //   authControllers.restrictToAdmin,
  //   CGUControllers.createCGU
  // )
  .post(
    authControllers.protect,
    authControllers.restrictToAdmin,
    CGUControllers.createCGU
  )
  .put(
    authControllers.protect,
    authControllers.restrictToAdmin,
    CGUControllers.updateCGU
  );

module.exports = router;
