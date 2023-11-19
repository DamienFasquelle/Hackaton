const { UniqueConstraintError, ValidationError } = require("sequelize");
const { userModel, roleModel } = require("../Db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "ma_clé_secrète";

exports.signIn = async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const dataUser = { ...userData, RoleId: 2, password: hash };
    const result = await userModel.create(dataUser);
    const createdUser = await userModel.scope("withoutPassword").findOne({
      where: { id: result.id },
    });
    res.status(201).json({
      message: "Un utilisateur a bien été créé.",
      data: createdUser,
    });
  } catch (error) {
    if (
      error instanceof ValidationError ||
      error instanceof UniqueConstraintError
    ) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error });
  }
};

exports.login = (req, res) => {
  userModel
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user)
        return res.status(404).json({ message: `L'utilisateur n'existe pas` });
      bcrypt.compare(req.body.password, user.password).then((isValid) => {
        if (isValid) {
          const token = jwt.sign(
            {
              data: {
                email: req.body.email,
                id: user.id,
                role: user.RoleId,
              },
            },
            SECRET_KEY,
            { expiresIn: 60 * 60 * 24 }
          );

          res.status(201).json({ message: "login réussi", data: token });
        } else {
          return res.json({ message: `Le mot de passe n'est pas correct` });
        }
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};

exports.protect = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: `Vous n'êtes pas authentifié.` });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.email = decoded.data.email;
      next();
    } catch (error) {
      res.status(403).json({ message: `Le jeton n'est pas valide` });
    }
  } else {
    res.status(401).json({ message: `Vous n'êtes pas authentifié.` });
  }
};

exports.restrictToOwnUser = (modelParam) => {
  return (req, res, next) => {
    modelParam
      .findByPk(req.params.id)
      .then((result) => {
        if (!result) {
          const message = `La ressource n°${req.params.id} n'existe pas`;
          return res.status(404).json({ message });
        }
        return userModel
          .findOne({ where: { email: req.email } })
          .then((user) => {
            if (user.RoleId === 1) {
              return next();
            }
            if (result.UserId !== user.id) {
              const message = "Tu n'es pas le créateur de cette ressource";
              return res.status(403).json({ message });
            }
            return next();
          });
      })
      .catch((error) => {
        console.error("Erreur lors de l'autorisation:", error);
        const message = "Erreur lors de l'autorisation";
        res.status(500).json({ message, data: error });
      });
  };
};

exports.restrictToAdmin = (req, res, next) => {
  userModel
    .findOne({ where: { email: req.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      }

      if (user.RoleId === 1) {
        return next();
      } else {
        return res
          .status(403)
          .json({ message: "Vous n'avez pas les droits suffisants" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};
