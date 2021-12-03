'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.createTable("Recipes_Ingredients", {
    //     id: {
    //         allowNull: false,
    //         autoIncrement: true,
    //         primaryKey: true,
    //         type: Sequelize.INTEGER,
    //     },
    //     RecipeId: {
    //         allowNull: false,
    //         type: Sequelize.INTEGER,
    //     },
    //     IngredientId: {
    //         allowNull: false,
    //         type: Sequelize.INTEGER,
    //     },
    //     createdAt: {
    //         allowNull: false,
    //         type: Sequelize.DATE,
    //     },
    //     updatedAt: {
    //         allowNull: false,
    //         type: Sequelize.DATE,
    //     },
    // });

    // // A kapcsolótáblában egy recept-hozzávaló páros csak egyszer szerepelhet
    // await queryInterface.addConstraint("GenreMovie", {
    //     fields: ["RecipeId", "IngredientId"],
    //     type: "unique",
    // });
  },

  down: async (queryInterface, Sequelize) => {

    //  await queryInterface.dropTable("Recipes_Ingredients");
  }
};
