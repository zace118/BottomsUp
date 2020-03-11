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
                len: [8, 8]
            }
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