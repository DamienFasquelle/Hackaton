const { pictureModel, userModel } = require("../Db/sequelize");

exports.findAllPictures = (req, res) => {
  pictureModel
    .findAll({})
    .then((result) => {
      res.json({
        message: "La liste des photos a bien été récupérée.",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

exports.findPictureById = (req, res) => {
  pictureModel
    .findOne({
      where: { id: req.params.id },
    })
    .then((result) => {
      if (!result) {
        return res
          .status(404)
          .json({ message: "Aucune image trouvée avec cet ID." });
      }
      const picture = {
        id: result.id,
        link: result.link,
        description: result.description,
        vote: result.numberOfVotes,
        status: result.status,
      };
      res.json({
        message: "La photo a bien été récupérée.",
        data: picture,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

exports.topFivePicture = (req, res) => {
  pictureModel
    .findAll({})
    .then((result) => {
      result.sort((a, b) => b.numberOfVotes - a.numberOfVotes);
      const topFive = result.slice(0, 5);

      res.json({
        message: "La liste des 5 meilleurs photos a bien été récupérée.",
        data: topFive,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: `${error}` });
    });
};

exports.deletePicture = (req, res) => {
  pictureModel
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "Aucune photo trouvé" });
      } else {
        return result.destroy().then(() => {
          res.json({
            message: `photo supprimé : ${result.dataValues.id} `,
            data: result,
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: `${error}` });
    });
};
exports.createPicture = async (req, res) => {
  const { description } = req.body;
  const imagePath = `${req.protocol}://${req.get("host")}/files/${
    req.file.filename
  }`;

  try {
    const user = await userModel.findOne({ where: { email: req.email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const picture = await pictureModel.create({
      description: description,
      link: imagePath,
      numberOfVotes: 0,
      status: "non publié",
      UserId: user.id,
    });
    res
      .status(201)
      .json({ message: `Création de l'image réussie`, data: picture });
  } catch (error) {
    console.error("Erreur interne du serveur :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

exports.updatePicture = (req, res) => {
  pictureModel
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "Aucune image trouvée" });
      } else {
        return result.update(req.body).then(() => {
          res.json({
            message: `Image modifié : ${result.dataValues.id} `,
            data: result,
          });
        });
      }
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    });
};
exports.votePicture = (req, res) => {
  pictureModel
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "L'ID ne correspond pas à l'image" });
      } else {
        const updatedVotes = result.dataValues.numberOfVotes + 1;
        result
          .update({ numberOfVotes: updatedVotes })
          .then(() => {
            res.json({
              message: `Image modifiée : ${result.dataValues.id}`,
              data: result,
            });
          })
          .catch((error) => {
            res.status(500).json({ message: error.message });
          });
      }
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
};
