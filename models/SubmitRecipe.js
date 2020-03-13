module.exports = function (sequelize, DataTypes) {
    const SubmitRecipe = sequelize.define("SubmitRecipe", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true
        },
        recipe: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true
        },
        spirit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return SubmitRecipe;
}