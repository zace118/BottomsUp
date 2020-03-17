module.exports = function (sequelize, DataTypes) {
    const SubmitComment = sequelize.define("SubmitComment", {
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },

        author: {
            type: DataTypes.STRING,
            allowNull: false
        }

     
    });

    SubmitComment.associate = function(models) {
        // associations can be defined here
        console.log("inside customer burger associate customer")
        console.log(models)
        SubmitComment.belongsTo(models.SubmitMeetup, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return SubmitComment;
}