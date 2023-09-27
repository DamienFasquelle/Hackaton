const { UniqueConstraintError, ValidationError } = require("sequelize");
const { userModel } = require("../Db/sequelize");
const bcrypt = require("bcrypt");

exports.findAllUsers = (req, res) => {
  userModel
    .scope("withoutPassword")
    .findAll()
    .then((result) => {
      res.json({
        message: "La liste des utilisateurs a bien été récupérée.",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};
exports.deleteUser = (req, res) => {
  userModel
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "Aucun utilisateur trouvé" });
      } else {
        return result.destroy().then(() => {
          result.password = "hidden";
          res.json({
            message: `utilisateur supprimé : ${result.dataValues.id} `,
            data: result,
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: `${error}` });
    });
};
exports.updatePassword = (req, res) => {
  userModel
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "Aucun utilisateur trouvé" });
      } else {
        return bcrypt.hash(req.body.password, 10).then((hash) => {
          const dataUser = { ...req.body, password: hash };
          return result.update(dataUser).then(() => {
            res.json({
              message: `Mot de passe modifié : ${result.dataValues.id} `,
              data: result,
            });
          });
        });
      }
    })
    .catch((error) => {
      if (
        error instanceof UniqueConstraintError ||
        error instanceof ValidationError
      ) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    });
};
