const express = require("express");
const router = express.Router();
const pictureControllers = require("../controllers/pictureControllers");
const authControllers = require("../controllers/authControllers");
const multer = require("../middleware/multer-config");

// const { pictureModel } = require("../Db/sequelize");

router
  .route("/")
  .get(pictureControllers.findAllPictures)
  .post(
    authControllers.protect,
    multer.single("image"),
    pictureControllers.createPicture
  );
router.route("/topFive").get(pictureControllers.topFivePicture);

router
  .route("/:id")
  // .delete(
  //   authControllers.protect,
  //   authControllers.restrictToOwnUser(pictureModel),
  //   pictureControllers.deletePicture
  // )
  .get(pictureControllers.findPictureById)
  .put(pictureControllers.updatePicture);

router.route("/vote/:id").put(pictureControllers.votePicture);

module.exports = router;
