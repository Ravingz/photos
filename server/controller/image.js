const client = require('../db/connection');

exports.restaurantImages = (req, res) => {
  const query = `SELECT * from ravingz.images_by_restaurant WHERE restaurantid = ${req.params.id}`;

  client.execute(query)
  .then((result) => {
    res.json(result.rows)
  })
  .catch(err => console.log(err));  
}