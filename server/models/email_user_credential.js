'use strict';
module.exports = (sequelize, DataTypes) => {
  const Email_User_Credential = sequelize.define('Email_User_Credential', {
    userId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Email_User_Credential.associate = function(models) {
    // associations can be defined here
  };
  return Email_User_Credential;
};