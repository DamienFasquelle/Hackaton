module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Picture",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      link: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Il faut un link",
          },
          notEmpty: {
            msg: "Le link ne peut pas être vide.",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Il faut une description",
          },
          notEmpty: {
            msg: "La description ne peut pas être vide.",
          },
        },
      },
      numberOfVotes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      updatedAt: false,
      createdAt: false,
    }
  );
};
