module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Il faut un prénom d'utilisateur.",
          },
          notEmpty: {
            msg: "Le prénom d'utilisateur ne peut pas être vide.",
          },
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Il faut un nom d'utilisateur.",
          },
          notEmpty: {
            msg: "Le nom d'utilisateur ne peut pas être vide.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "Le mail est déja pris.",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "S'il vous plait entrez un email pour vous connecter.",
          },
          notEmpty: {
            msg: "Email ne peux pas être vide",
          },
        },
      },
      password: DataTypes.STRING,
      RoleId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      scopes: {
        withoutPassword: {
          attributes: { exclude: ["password"] },
        },
      },
    },
    {
      updatedAt: false,
      createdAt: false,
    }
  );
};
