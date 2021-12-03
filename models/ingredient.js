'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Recipe, {
          through: "RecipeIngredient"
      });
      this.belongsTo(models.Storage);
    }
  };
  Ingredient.init({
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    StorageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};
