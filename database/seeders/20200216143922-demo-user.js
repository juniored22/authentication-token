'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
        {
        name: 'John Doe',
        email: 'teste',
        password: '$2a$10$6I6Crqx1mQHeY/ov.Dgp..w7XsKlBGkYQ1uznFJCJC6fHlWR32Gza',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
