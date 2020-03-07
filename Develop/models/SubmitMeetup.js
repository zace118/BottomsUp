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
<<<<<<< HEAD
                len: [8, 8]
              }
=======
                len: [3, 10]
              },
>>>>>>> 47a4d897a1bbbce0d36518bc3c398b414c0a0371
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return SubmitMeetup;
}