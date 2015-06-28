'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set: function(pass) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(pass, salt);
        this.setDataValue('password', hash);
      }
    },
    isAdmin: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      verifyPassword: function(password, callback) {
        return bcrypt.compare(password, this.password, callback);
      }
    }
  });
  return User;
};
