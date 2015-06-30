'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn(
        'Services',
        'latitude',
        {
          type: Sequelize.STRING
        }
      )
      .then(function() {
        return queryInterface.addColumn(
          'Services',
          'longitude',
          {
            type: Sequelize.STRING
          });
      });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('Services', 'latitude')
      .then(function() {
        return queryInterface.removeColumn('Services', 'longitude');
      });
  }
};
