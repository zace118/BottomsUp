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

    return SubmitMeetup;
}