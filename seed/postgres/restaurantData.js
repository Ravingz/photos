'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let entries = 0;

    while(entries < 1000000) {

      if(
        entries === 300000 || 
        entries === 600000 || 
        entries === 900000 ){
        console.log('inserted: ', entries)
      }

      let date = new Date();
      data.push({
        name: faker.company.companyName(),
        createdAt: date,
        updatedAt: date
      })

      entries++;
    }
    
    return queryInterface.bulkInsert('restaurants', data, {});
 
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('restaurants', null, {});
  }
};
