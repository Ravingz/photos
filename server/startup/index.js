const image = require('../routes/image')
const restaurant = require('../routes/restaurant')

module.exports = (app, express) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/api/images', image);
  app.use('/api/restaurants', restaurant);
};
