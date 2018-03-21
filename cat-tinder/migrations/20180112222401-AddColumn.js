'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Cats', 'profile_views', Sequelize.INTEGER);
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Cats', 'profile_views');
  }
};
