module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "CGU",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Il faut un texte CGU.",
          },
          notEmpty: {
            msg: "Le texte CGU ne peut pas être vide.",
          },
        },
      },
    },
    {
      updatedAt: false,
      createdAt: false,
    }
  );
};
