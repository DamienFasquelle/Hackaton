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
        return res.sendStatus(404);
      }
      bcrypt.compare(actualPassword, user.password).then((isValid) => {
        if (!isValid) {
          return res.sendStatus(400);
        }
        if (newPassword !== confirmPassword) {
          return res.sendStatus(400);
        }
        bcrypt.hash(newPassword, 10).then((hash) => {
          userModel
            .update({ password: hash }, { where: { id: userId } })
            .then(() => {
              res.sendStatus(200);
            })
            .catch(() => {
              res.sendStatus(500);
            });
        });
      });
    })
    .catch(() => {
      res.sendStatus(500);
    });
};
