'use strict';
module.exports = function(sequelize, DataTypes) {
  var Service = sequelize.define('Service', {
    cid: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.STRING,
    ipaddress: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Service;
};
