const { Restaurant, Image } = require('../model/base');

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
    const result = await Image.find({ restaurantid: req.params.restaurantid });
    res.json(result.rows);

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