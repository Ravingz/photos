'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let entries = 0;

    while(entries < 1000) {

      let date = new Date();
      data.push({
        title: faker.company.companyName(),
        url: `https://ravingz.s3-us-west-1.amazonaws.com/${faker.random.number({max: 999, min: 0})}.jpg`,
        comment: faker.lorem.sentence(),
        createdAt: date,
        updatedAt: date,
        userId: faker.random.number({ min: 1, max: 100 }),
        restaurantId: faker.random.number({ min: 1, max: 100 })
      })

      entries++;
    }
    
    return queryInterface.bulkInsert('images', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('images', null, {});
  }
};
