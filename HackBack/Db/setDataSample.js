const bcrypt = require("bcrypt");
const roles = require("./roles.json");

module.exports = async (roleModel, userModel) => {
  try {
    const rolesPromises = roles.map((role) =>
      roleModel.create({ label: role })
    );
    await Promise.all(rolesPromises);

    const hashedPassword = await bcrypt.hash("admin", 10);
    const userData = {
      name: "damien",
      lastname: "fasquelle",
      email: "damien.fasquelle@lapiscine.pro",
      password: hashedPassword,
      RoleId: 1,
    };
    const createdUser = await userModel.create(userData);

    console.log("Données insérées avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'insertion des données :", error);
  }
};
