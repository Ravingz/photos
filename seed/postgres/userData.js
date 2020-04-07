'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let entries = 0;

    while(entries < 1000) {
      let date = new Date();
      data.push({
        name: faker.name.firstName(),
        profileUrl: `https://i.pravatar.cc/150?img=${faker.random.number({min: 1, max: 70})}`,
        createdAt: date,
        updatedAt: date
      })

      entries++;
    }
    
    return queryInterface.bulkInsert('users', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
