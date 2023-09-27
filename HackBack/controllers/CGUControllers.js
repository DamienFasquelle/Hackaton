const { CGUModel } = require("../Db/sequelize");

exports.findCGU = (req, res) => {
  CGUModel.findOne({})
    .then((result) => {
      res.json({
        message: "le CGU a bien été récupéré",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};
exports.createCGU = (req, res) => {
  console.log(req.body);
  CGUModel.findOne({})
    .then(() => {
      return CGUModel.create({
        ...req.body,
      }).then((result) => {
        res.json({ message: `création du texte du CGU`, data: result });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

exports.updateCGU = (req, res) => {
  CGUModel.findOne()
    .then((cgu) => {
      if (!cgu) {
        return res.status(404).json({ message: "Aucun CGU trouvé." });
      }
      cgu.text = req.body.text;
      return cgu.save();
    })
    .then((updatedCGU) => {
      res.json({
        message: `CGU modifié : ${updatedCGU.id}`,
        data: updatedCGU,
      });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    });
};

exports.deleteCGU = (req, res) => {
  CGUModel.findOne({})
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "Aucun CGU trouvé" });
      } else {
        return result.destroy().then(() => {
          res.json({
            message: `CGU supprimé : ${result.dataValues.id} `,
            data: result,
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: `${error}` });
    });
};
