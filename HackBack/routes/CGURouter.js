const express = require("express");
const router = express.Router();
const CGUControllers = require("../controllers/CGUControllers");
const authControllers = require("../controllers/authControllers");

router
  .route("/")
  .get(
    authControllers.protect,
    authControllers.restrictToAdmin,
    CGUControllers.findCGU
  )
  // .post(
  //   authControllers.protect,
  //   authControllers.restrictToAdmin,
  //   CGUControllers.createCGU
  // )
  .post(CGUControllers.createCGU)
  .delete(
    authControllers.protect,
    authControllers.restrictToAdmin,
    CGUControllers.deleteCGU
  )
  .put(
    authControllers.protect,
    authControllers.restrictToAdmin,
    CGUControllers.updateCGU
  );

module.exports = router;
