const { UniqueConstraintError, ValidationError } = require("sequelize");
const { userModel, pictureModel } = require("../Db/sequelize");
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
  const userId = req.params.id;
  const { actualPassword, newPassword, confirmPassword } = req.body;
  userModel
    .findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      bcrypt.compare(actualPassword, user.password).then((isValid) => {
        if (!isValid) {
          return res
            .status(400)
            .json({ message: "Mauvais mot de passe actuel" });
        }
        if (newPassword !== confirmPassword) {
          return res.status(400).json({
            message: "Les nouveaux mots de passe ne correspondent pas",
          });
        }
        bcrypt.hash(newPassword, 10).then((hash) => {
          userModel
            .update({ password: hash }, { where: { id: userId } })
            .then(() => {
              res.status(200).json({ message: "Mot de passe changé" });
            })
            .catch((error) => {
              res.status(500).json({ message: error.message });
            });
        });
      });
    })
    .catch(() => {
      res.status(500).json({ message: "Erreur serveur" });
    });
};

exports.findUserById = (req, res) => {
  userModel
    .findOne({
      where: { id: req.params.id },
    })
    .then((result) => {
      if (!result) {
        return res
          .status(404)
          .json({ message: "Aucun utilisateur trouvé avec cet ID." });
      }

      const user = {
        id: result.id,
        name: result.name,
        lastname: result.lastname,
        email: result.email,
        password: result.password,
      };

      res.json({
        message: "L'utilisateur a bien été récupéré.",
        data: user,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};
