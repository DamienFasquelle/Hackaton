const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("hackaton", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
});

sequelize
  .authenticate()
  .then(() =>
    console.log("La connexion à la base de données a bien été établie.")
  )
  .catch((error) =>
    console.log(`Ìmpossible de se connecter à la base de données ${error}`)
  );

const defineUserModel = require("../models/userModelDefinition");
const definePictureModel = require("../models/pictureModelDefinition");
const defineRoleModel = require("../models/roleModelDefinition");
const defineCGUModel = require("../models/CGUModelDefinition");

const setDataSample = require("./setDataSample");

const userModel = defineUserModel(sequelize, DataTypes);
const pictureModel = definePictureModel(sequelize, DataTypes);
const roleModel = defineRoleModel(sequelize, DataTypes);
const CGUModel = defineCGUModel(sequelize, DataTypes);

roleModel.hasMany(userModel);
userModel.belongsTo(roleModel);

userModel.hasMany(pictureModel);
pictureModel.belongsTo(userModel);

const initDataBase = () => {
  sequelize
    .sync({ force: true })
    .then(() => {
      setDataSample(roleModel, userModel, pictureModel, CGUModel);
    })
    .catch((error) => {
      console.error(
        `Erreur de synchronisation avec la base de données : ${error}`
      );
    });
};

module.exports = {
  initDataBase,
  userModel,
  roleModel,
  pictureModel,
  CGUModel,
};
