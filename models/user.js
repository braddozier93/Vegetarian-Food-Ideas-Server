module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {//at least 4 characters and one number or special character
            type: DataTypes.STRING,
            allowNull: false,
            unique: true//won't let us create multiple accounts/users with the same username
        },
        email: {//must be in format test@test.com
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {//must be at least 5 characters
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return User;
}