'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type:DataTypes.STRING,
      allowedNull: false,
      unique: true
    },
    password: {
      type:DataTypes.STRING,
      allowedNull: false
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};