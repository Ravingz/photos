const image = require('../routes/image')

module.exports = (app, express) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/api/restaurants', image);
};
