"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Recipe extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Appliance);
            this.belongsToMany(models.Ingredient, {
                through: "RecipeIngredient"
            });
        }
    }
    Recipe.init(
        {
            name: DataTypes.STRING,
            isVegetarian: DataTypes.BOOLEAN,
            doneCount: DataTypes.INTEGER,
            ApplianceId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Recipe",
        }
    );
    return Recipe;
};
