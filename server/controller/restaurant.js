const { Restaurant, Image } = require('../model/base');
const { cache } = require('../db/connection');

exports.getRestaurantsAll = async (req, res) => {
  try {
    const result = await Restaurant.find();
    res.json(result.rows);

  } catch (error) {
    console.log(error)
  }
}

exports.getRestaurant = async (req, res) => {
  try {
    const result = await Restaurant.find();
    res.json(result.rows);

  } catch (error) {
    console.log(error)
  }
}

exports.getRestaurantImages = async (req, res) => {
  try {
    const restaurantid = req.params.restaurantid;
    const images = cache.get(restaurantid);
    let result = undefined;

    if(!images) {
      result = await Image.find({ restaurantid });
      cache.set(restaurantid, result.rows, 600);
      res.json({ rows: result.rows, count: 123 });

    } else {
      res.json({ rows: images, count: 123 });
    }

  } catch (error) {
    console.log(error)
  }
}

exports.create = async (req, res) => {
  try {
    await Restaurant.create(req.body);
    res.status(201).json({ success: 'Successfully posted restaurant!' })

  } catch (error) {
    console.log(error)
  }
}

exports.update = async (req, res) => {
  try {
    await Restaurant.update(req.params.restaurantid, req.body);
    res.status(201).json({ success: 'Successfully updated restaurant!' })

  } catch (error) {
    console.log(error)
  }
}

exports.remove = async (req, res) => {
  try {
    await Restaurant.delete(req.params.restaurantid);
    res.status(201).json({ success: 'Successfully deleted restaurant!' });

  } catch (error) {
    console.log(error)
  }  
}