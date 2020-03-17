module.exports = function (sequelize, DataTypes) {
    const SubmitMeetup = sequelize.define("SubmitMeetup", {
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10, 10]
            }
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },

        author: {
            type: DataTypes.STRING,
            allowNull: false
        }


    });

    SubmitMeetup.associate = function(models) {
    

        SubmitMeetup.hasMany(models.SubmitComment);
      
      // associations can be defined here
    };

    return SubmitMeetup;
}