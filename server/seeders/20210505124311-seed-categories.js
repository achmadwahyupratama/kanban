'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert(
       'Categories', [{
           categoryName: 'Backlog',
           createdAt: new Date(),
           updatedAt: new Date()
          },
          {
            categoryName: 'Product',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            categoryName: 'Development',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            categoryName: 'Done',
            createdAt: new Date(),
            updatedAt: new Date()
          }], {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Categories', null, {});
  }
};
